import { cn } from "@shared/utils/cn";

const Card = ({ value, isFlipped, isMatched, onFlip, cardSize, ...props }) => {
  const handleClickCard = () => {
    if (!isMatched && !isFlipped) onFlip();
  };

  const showBack = isFlipped || isMatched;

  return (
    <button
      type="button"
      onClick={handleClickCard}
      disabled={isMatched}
      className={cn(
        "perspective-1000 relative h-full w-full cursor-pointer rounded-xl transition-transform",
        cardSize,
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl transition-transform duration-500",
          "transform-style-3d",
          showBack && "rotate-y-180",
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-amber-300 backface-hidden">
          ?
        </div>
        <div className="absolute inset-0 flex rotate-y-180 items-center justify-center rounded-xl bg-blue-300 backface-hidden">
          {value}
        </div>
      </div>
    </button>
  );
};

export default Card;
