import PanelHeader from "@shared/components/panel-header";

import GameInfoBoard from "@widgets/game-board/components/game-info-board";
import Modal from "@shared/components/modal";
import { LEVEL_CONFIG } from "@widgets/game-board/constants/game-config";
import { useGameBoard } from "@widgets/game-board/hooks/use-game-board";
import { cn } from "@shared/utils/cn";
import Card from "@widgets/game-board/components/card/card";

const MODAL_TEXT = {
  SUCCESS: "축하합니다",
  FAIL: "실패했습니다",
  RESET: "초 후 게임이 초기화됩니다.",
};

const GameBoard = () => {
  const {
    board,
    remainingTime,
    totalPairs,
    timerStatus,
    messageKey,
    modalState,
    resetCountdown,
    handleCardFlip,
    handleGenerateDeck,
    onResetTagClick,
  } = useGameBoard();

  const { cols, rows, cardSize } = LEVEL_CONFIG[board.level];

  return (
    <div className="flex gap-6 p-6">
      <section className="flex h-full flex-1 flex-col gap-4">
        <PanelHeader
          title="게임 보드"
          tagText="게임 리셋"
          onTagClick={onResetTagClick}
        />
        <div className="flex h-[480px] w-full max-w-[480px] items-center justify-center">
          {board.cards.length > 0 && (
            <div className={cn("grid h-full w-full gap-4", cols, rows)}>
              {board.cards.map(({ id, value, isFlipped, isMatched }) => (
                <Card
                  key={id}
                  value={value}
                  isFlipped={isFlipped}
                  isMatched={isMatched}
                  onFlip={() => handleCardFlip(id)}
                  cardSize={cardSize}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <GameInfoBoard
        value={board.level}
        onChange={handleGenerateDeck}
        remainingTime={remainingTime}
        matchedPairs={board.matchedPairs}
        totalPairs={totalPairs}
        timerStatus={timerStatus}
        history={board.history}
        messageKey={messageKey}
      />

      <Modal isOpen={modalState.open}>
        <h2 className="mb-2 text-2xl font-bold text-slate-800">
          {modalState.type === "success" ? MODAL_TEXT.SUCCESS : MODAL_TEXT.FAIL}
        </h2>
        <p className="text-sm text-slate-500">
          {resetCountdown}
          {MODAL_TEXT.RESET}
        </p>
      </Modal>
    </div>
  );
};

export default GameBoard;
