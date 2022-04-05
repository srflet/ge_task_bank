import React from "react";
import { nameToAvatar } from "../../shared/avatars";

export function Avatar({ player, bordered, iconOnly, isAltLayout }) {
  const av = player.get("avatar");
  if (!av) {
    return null;
  }

  const avatar = nameToAvatar[av];
  if (!avatar) {
    return null;
  }

  const cn = ["flex justify-center items-center"];
  const cnv = ["h-6 w-6"];

  if (bordered) {
    cn.push("border border-gray-400 px-5 py-1 rounded-full");
    if (isAltLayout) {
      cn.push("w-48");
    }
  }

  return (
    <div className="inline-block">
      <div className={cn.join(" ")}>
        <div
          className={cnv.join(" ")}
          dangerouslySetInnerHTML={{
            __html: avatar.svg,
          }}
        ></div>
        <div className="ml-3 text-gray-500">
        {iconOnly ? "" : player.id} {socialExposure ? player.get("firstAnswer") : ""}
        </div>
      </div>
    </div>
  );
}
