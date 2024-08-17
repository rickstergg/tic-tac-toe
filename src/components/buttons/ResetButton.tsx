import { FC } from "react";
import { Flexbox } from "../layout";
import { Rewind } from "lucide-react";

type Props = {
  onReset: () => void;
};

export const ResetButton: FC<Props> = ({ onReset }) => {
  return (
    <Flexbox
      onClick={onReset}
      className="cursor-pointer"
      justify="end"
      align="center"
      gap={1}
    >
      Reset
      <Rewind className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Flexbox>
  );
};
