import { FC } from "react";
import { ShortcutsProps } from "./types";
import { Flexbox } from "./layout";
import { cn } from "../lib/utils";

export const Shortcuts: FC<ShortcutsProps> = ({
  preDescription,
  keys,
  postDescription,
  className,
}) => {
  const keysWithPlus = keys.flatMap((value, index, array) =>
    array.length - 1 !== index ? [value, "+"] : value,
  );

  return (
    <Flexbox
      className={cn("text-xs text-foreground-2", className)}
      direction="row"
      gap={2}
      align="center"
    >
      {preDescription && <>{preDescription}</>}
      <Flexbox direction="row" gap={1} align="center">
        {keysWithPlus.map((key, index) => {
          return (
            <div
              key={index}
              className={
                key !== "+" ? "border rounded-lg px-2 py-1 shadow" : undefined
              }
            >
              {key === "+" ? "+" : key}
            </div>
          );
        })}
      </Flexbox>
      {postDescription && <>{postDescription}</>}
    </Flexbox>
  );
};
