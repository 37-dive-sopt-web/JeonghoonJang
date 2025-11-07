import { useEffect, useRef, useState } from "react";
import {
  LEVEL_CONFIG,
  INITIAL_LEVEL,
} from "@widgets/game-board/constants/game-config";
import {
  createInitialState,
  calcClearTime,
  calcTotalPairs,
} from "@widgets/game-board/utils/getDeck";
import { rankingStorageService } from "@shared/utils/local-storage-service";

const INITIAL_RESET_COUNT = 3;

export const useGameBoard = () => {
  const [board, setBoard] = useState(() => createInitialState(INITIAL_LEVEL));
  const [remainingTime, setRemainingTime] = useState(
    LEVEL_CONFIG[INITIAL_LEVEL].timeLimit,
  );
  const [timerStatus, setTimerStatus] = useState("idle");
  const [messageKey, setMessageKey] = useState("START");
  const [modalState, setModalState] = useState({
    open: false,
    type: "success",
  });
  const [resetCountdown, setResetCountdown] = useState(INITIAL_RESET_COUNT);

  const timerRef = useRef(null);
  const flipTimeoutRef = useRef(null);
  const hasRecordedRef = useRef(false);
  const handleGenerateDeckRef = useRef(() => {});

  const totalPairs = calcTotalPairs(board.level);

  const showResultModal = (type) => {
    setModalState({ open: true, type });
    setResetCountdown(INITIAL_RESET_COUNT);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTimerStatus("finished");
  };

  const resetTimer = (level) => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setRemainingTime(LEVEL_CONFIG[level].timeLimit);
    setTimerStatus("idle");
  };

  const clearFlipTimeout = () => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
  };

  const handleGenerateDeck = (level) => {
    hasRecordedRef.current = false;
    clearFlipTimeout();
    resetTimer(level);
    setBoard(createInitialState(level));
    setMessageKey("START");
    setModalState((prev) => ({ ...prev, open: false }));
  };
  handleGenerateDeckRef.current = handleGenerateDeck;

  useEffect(() => {
    if (!modalState.open) return;
    const interval = setInterval(() => {
      setResetCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleGenerateDeckRef.current(board.level);
          return INITIAL_RESET_COUNT;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [modalState.open, board.level]);

  const startTimer = () => {
    if (timerRef.current) return;
    setTimerStatus("running");
    timerRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0.1) {
          stopTimer();
          setMessageKey("FAIL");
          showResultModal("fail");
          return 0;
        }
        return parseFloat((prev - 0.1).toFixed(2));
      });
    }, 100);
  };

  const handleCardFlip = (cardId) => {
    if (timerStatus === "idle") startTimer();
    if (flipTimeoutRef.current) return;

    setBoard((prev) => {
      const cardIndex = prev.cards.findIndex((card) => card.id === cardId);
      const target = prev.cards[cardIndex];
      if (!target || target.isMatched || target.isFlipped) {
        setMessageKey("SELECT_SAME");
        return prev;
      }

      const updatedCards = prev.cards.map((card, index) =>
        index === cardIndex ? { ...card, isFlipped: true } : card,
      );
      const nextFlipped = [...prev.flipped, cardId];

      if (nextFlipped.length === 1) {
        setMessageKey("SELECT_ONE");
        return { ...prev, cards: updatedCards, flipped: nextFlipped };
      }

      const [firstId, secondId] = nextFlipped;
      const first = updatedCards.find((card) => card.id === firstId);
      const second = updatedCards.find((card) => card.id === secondId);
      if (!first || !second) {
        return { ...prev, cards: updatedCards, flipped: [] };
      }

      if (first.value === second.value) {
        const cardsWithMatch = updatedCards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isMatched: true }
            : card,
        );
        const matchedPairs = prev.matchedPairs + 1;
        setMessageKey("SUCCESS");

        if (matchedPairs === totalPairs && !hasRecordedRef.current) {
          hasRecordedRef.current = true;
          stopTimer();
          const clearTime = calcClearTime(prev.level, remainingTime);
          const entry = {
            level: prev.level,
            time: Number(clearTime.toFixed(2)),
            timestamp: Date.now(),
          };
          const nextRankings = [
            ...rankingStorageService.getRankings(),
            entry,
          ].sort((a, b) =>
            a.level === b.level ? a.time - b.time : b.level - a.level,
          );
          rankingStorageService.saveRankings(nextRankings);
          showResultModal("success");
        }

        return {
          ...prev,
          cards: cardsWithMatch,
          flipped: [],
          matchedPairs,
          history: [
            { first: first.value, second: second.value, matched: true },
            ...prev.history,
          ],
        };
      }

      setMessageKey("FAIL");
      flipTimeoutRef.current = setTimeout(() => {
        setBoard((current) => ({
          ...current,
          cards: current.cards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card,
          ),
          flipped: [],
        }));
        flipTimeoutRef.current = null;
      }, 700);

      return {
        ...prev,
        cards: updatedCards,
        flipped: nextFlipped,
        history: [
          { first: first.value, second: second.value, matched: false },
          ...prev.history,
        ],
      };
    });
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearFlipTimeout();
    };
  }, []);

  return {
    board,
    remainingTime,
    timerStatus,
    messageKey,
    modalState,
    resetCountdown,
    totalPairs,
    handleCardFlip,
    handleGenerateDeck,
    onResetTagClick: () => handleGenerateDeck(board.level),
  };
};
