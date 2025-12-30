import { LEVEL_CONFIG } from "@widgets/game-board/constants/game-config";
import { buildDeck } from "@widgets/game-board/utils/getShuffleDeck";

export const createInitialState = (level) => ({
  cards: createDeckWithState(level),
  flipped: [],
  matchedPairs: 0,
  status: "ready",
  level,
  history: [],
});

export const createDeckWithState = (level) =>
  buildDeck(level).map((card) => ({
    ...card,
    isFlipped: false,
    isMatched: false,
  }));

export const calcTotalPairs = (level) =>
  (LEVEL_CONFIG[level].rowCount * LEVEL_CONFIG[level].colCount) / 2;

export const calcClearTime = (level, remainingTime) =>
  LEVEL_CONFIG[level].timeLimit - remainingTime;
