import { FC } from "react";
import { CellValue } from "./types";
import { Flexbox } from "./layout";

type Props = {
  value: CellValue;
  classNames: string;
  onClick: () => void;
};

export const Cell: FC<Props> = ({ classNames, value, onClick }) => {
  return (
    <Flexbox
      className={`w-20 h-20 cursor-pointer ${classNames}`}
      align="center"
      justify="center"
      onClick={onClick}
    >
      {value}
    </Flexbox>
  );
};
