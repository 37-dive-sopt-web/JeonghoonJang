import GameInfo from "@widgets/game-board/components/game-info";
import HistoryCard from "@widgets/game-board/components/history-card";
import LevelDropdown from "@widgets/game-board/components/level-dropdown";

const TITLE = {
  INFO_MESSAGE: "안내 메시지",
  RECENTLY_HISTORY: "최근 히스토리",
};

const CONTENT = {
  START: "카드를 눌러 게임을 시작",
  SUCCESS: "굳!",
  FAIL: "틀렸습니다~",
  SELECT_ONE: "하나 더 선택하세요.",
  SELECT_SAME: "이미 선택한 카드입니다.",
};

const GameInfoBoard = ({
  value,
  onChange,
  remainingTime,
  matchedPairs,
  totalPairs,
  history,
  messageKey = "START",
}) => {
  return (
    <section className="flex w-[500px] flex-col gap-6 rounded-2xl bg-blue-300 p-4">
      <LevelDropdown value={value} onChange={onChange} />

      <div className="flex justify-around">
        <GameInfo title="남은 시간" content={remainingTime.toFixed(2)} />
        <GameInfo title="성공한 짝" content={`${matchedPairs}/${totalPairs}`} />
        <GameInfo title="남은 짝" content={`${totalPairs - matchedPairs}`} />
      </div>

      <p>{TITLE.INFO_MESSAGE}</p>
      <div className="flex h-14 items-center rounded-2xl bg-white p-3">
        {CONTENT[messageKey]}
      </div>

      <p>{TITLE.RECENTLY_HISTORY}</p>
      <div className="flex flex-col gap-1">
        {history.map(({ first, second, matched }, index) => (
          <HistoryCard
            key={index}
            firstNum={first}
            secondNum={second}
            isSuccess={matched}
          />
        ))}
      </div>
    </section>
  );
};

export default GameInfoBoard;
