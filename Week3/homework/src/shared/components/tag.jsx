import { cn } from "@shared/utils/cn";

const Tag = ({ content, bgColor = "bg-gray-300", onClick }) => {
  const isBgColorGray = bgColor?.includes("gray");
  return (
    <button
      className={cn(
        "text-s flex h-8 cursor-pointer items-center rounded-xl px-3 py-1 active:opacity-80",
        bgColor,
        isBgColorGray ? "text-black" : "text-white",
      )}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Tag;
