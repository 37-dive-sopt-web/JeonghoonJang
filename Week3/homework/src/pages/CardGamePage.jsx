import Board from "@layout/board";
import Header from "@layout/header";
import { useState } from "react";

const CardGamePage = () => {
  const [mode, setMode] = useState("game");

  return (
    <div className="flex h-svh flex-col gap-8">
      <Header mode={mode} onTabChange={setMode} />
      <Board mode={mode} />
    </div>
  );
};

export default CardGamePage;
