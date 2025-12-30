const RankingListItem = ({ recordedAt, levelLabel, formattedTime, rank }) => {
  return (
    <div className="grid grid-cols-4 items-center rounded-xl bg-blue-100 px-4 py-2 text-base">
      <span>{rank}</span>
      <span>{levelLabel}</span>
      <span>{formattedTime}</span>
      <span>{recordedAt}</span>
    </div>
  );
};

export default RankingListItem;
