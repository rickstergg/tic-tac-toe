import { FC } from "react";
import { Flexbox } from "./layout";
import { RotateCcw } from "lucide-react";

type Props = {
  onReset: () => void;
};

export const ResetButton: FC<Props> = ({ onReset }) => {
  return (
    <Flexbox justify="end">
      <RotateCcw
        onClick={onReset}
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
    </Flexbox>
  );
};
