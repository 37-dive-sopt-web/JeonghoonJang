const GameInfo = ({ title, content }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-5">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-xl text-black">{content}</p>
    </div>
  );
};

export default GameInfo;
