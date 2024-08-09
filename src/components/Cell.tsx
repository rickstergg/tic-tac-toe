import { FC } from "react";
import { CellValue } from "./types";
import { Flexbox } from "./layout";

type Props = {
  value: CellValue;
  classNames: string;
};

export const Cell: FC<Props> = ({ classNames, value }) => {
  return (
    <Flexbox
      className={`w-20 h-20 cursor-pointer ${classNames}`}
      align="center"
      justify="center"
    >
      {value}
    </Flexbox>
  );
};
