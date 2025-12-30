import Card from "@widgets/game-board/components/card/card";
import Tag from "@shared/components/tag";

const PanelHeader = ({ title, tagText, onTagClick }) => {
  return (
    <div className="flex w-full justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Tag content={tagText} bgColor="bg-red-500" onClick={onTagClick} />
    </div>
  );
};

export default PanelHeader;
