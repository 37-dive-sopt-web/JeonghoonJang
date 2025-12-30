import Tag from "@shared/components/tag";

const TITLE = "숫자 카드 짝 맞추기";

const Header = ({ mode = "game", onTabChange }) => {
  const handleSelectTag = (nextMode) => {
    if (nextMode !== mode) {
      onTabChange(nextMode);
    }
  };

  const getTagColor = (target) =>
    target === mode ? "bg-blue-500 text-white" : "bg-gray-200 text-slate-700";

  return (
    <div className="flex h-20 items-center justify-between rounded-2xl bg-blue-200 p-4">
      <h1 className="text-3xl font-bold">{TITLE}</h1>

      <section className="flex gap-2">
        <Tag
          content="게임"
          bgColor={getTagColor("game")}
          onClick={() => handleSelectTag("game")}
        />
        <Tag
          content="랭킹"
          bgColor={getTagColor("ranking")}
          onClick={() => handleSelectTag("ranking")}
        />
      </section>
    </div>
  );
};

export default Header;
