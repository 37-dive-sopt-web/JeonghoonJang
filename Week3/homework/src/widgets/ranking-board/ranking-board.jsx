import { useEffect, useRef, useState } from "react";
import PanelHeader from "@shared/components/panel-header";
import { rankingStorageService } from "@shared/utils/local-storage-service";
import RankingListItem from "@widgets/ranking-board/components/ranking-list-item";

const columns = ["순위", "레벨", "클리어 시간(초)", "기록 시각"];

const RankingBoard = () => {
  const [rankings, setRankings] = useState([]);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const data = rankingStorageService
      .getRankings()
      .slice()
      .sort((first, second) => {
        if (first.level === second.level) {
          return first.time - second.time;
        }
        return second.level - first.level;
      });
    setRankings(data);
  }, []);

  const handleClear = () => {
    rankingStorageService.clear();
    setRankings([]);
    initializedRef.current = false;
  };

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <PanelHeader
        title="랭킹 보드"
        tagText="기록 초기화"
        onTagClick={handleClear}
      />

      <div className="rounded-2xl bg-white p-4">
        <div className="grid grid-cols-4 px-3 text-sm font-semibold text-slate-500">
          {columns.map((col) => (
            <span key={col}>{col}</span>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {rankings.map(({ level, time, timestamp }, index) => (
            <RankingListItem
              key={`${timestamp}-${index}`}
              rank={index + 1}
              levelLabel={`Level ${level}`}
              formattedTime={`${time.toFixed(2)} 초`}
              recordedAt={new Date(timestamp).toLocaleString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingBoard;
