import { FC } from "react";
import { CellValue } from "./types";

type Props = {
  isTie: boolean;
  winner?: CellValue;
};

export const Result: FC<Props> = ({ isTie, winner }) => {
  if (isTie) {
    return <>Game is a tie!</>;
  }

  if (winner) {
    return <>Winner is {winner}!</>;
  }

  return null;
};
