import { cn } from "@shared/utils/cn";

const HistoryCard = ({ firstNum, secondNum, isSuccess }) => {
  const color = isSuccess ? "text-green-500" : "text-red-500";
  const result = isSuccess ? "성공" : "실패";
  return (
    <div className="flex justify-between rounded-2xl bg-white px-5 py-2">
      <p className={cn(color)}>
        {firstNum} , {secondNum}
      </p>
      <p>{result}</p>
    </div>
  );
};

export default HistoryCard;
