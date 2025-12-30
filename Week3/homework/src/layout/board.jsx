import GameBoard from "@widgets/game-board/game-board";
import RankingBoard from "@widgets/ranking-board/ranking-board";

const Board = ({ mode = "game" }) => {
  const renderContent = mode === "game" ? <GameBoard /> : <RankingBoard />;

  return <div className="flex-1 rounded-2xl bg-blue-200">{renderContent}</div>;
};

export default Board;
