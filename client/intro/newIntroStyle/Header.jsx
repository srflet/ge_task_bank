import React from "react";
import Timer from "./Timer";
import { Avatar } from "../../game/Avatar";
import DebugButtons from "../../components/DebugButtons";


export function Header(props) {
  const {
    isAltLayout = false,
    player, timeToStart
  } = props;
  let classNames = ["h-16 grid grid-cols-3 items-center px-6"];

  if (isAltLayout) {
    classNames.push("bg-white");
  }
  return (
    <header className={classNames.join(" ")}>
      <div>
          <Avatar bordered player={player} isAltLayout={isAltLayout} />
      </div>
      <Timer remainingSeconds={timeToStart} {...props} />
      <div className="flex justify-end items-center">
        <DebugButtons {...props} />
      </div>
    </header>
  );
}
