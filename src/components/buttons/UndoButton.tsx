import { FC } from "react";
import { Flexbox } from "../layout";
import { Undo2 } from "lucide-react";

type Props = {
  onUndo: () => void;
};

export const UndoButton: FC<Props> = ({ onUndo }) => {
  return (
    <Flexbox
      onClick={onUndo}
      className="cursor-pointer"
      justify="end"
      align="center"
      gap={1}
    >
      Undo
      <Undo2 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Flexbox>
  );
};
