import { FC } from "react";
import { CellValue, Result } from "./types";
import { Flexbox } from "./layout";

type Props = {
  value: CellValue;
  classNames: string;
  onClick: () => void;
  rowIndex: number;
  columnIndex: number;
  result: Result;
  size: number;
};

function determineBounce(
  rowIndex: number,
  columnIndex: number,
  result: Result,
  size: number,
) {
  if (rowIndex === result.row || columnIndex === result.column) {
    return true;
  }

  if (result.diagonal === 1 && rowIndex === columnIndex) {
    return true;
  }

  if (result.diagonal === 2 && rowIndex === size - 1 - columnIndex) {
    return true;
  }

  return false;
}

export const Cell: FC<Props> = ({
  classNames,
  value,
  rowIndex,
  columnIndex,
  result,
  size,
  onClick,
}) => {
  const bounce = determineBounce(rowIndex, columnIndex, result, size);

  return (
    <Flexbox
      className={`w-20 h-20 cursor-pointer ${classNames}`}
      align="center"
      justify="center"
      onClick={onClick}
    >
      {value !== CellValue.EMPTY && (
        <div className={`${bounce && "animate-bounce"}`}>{value}</div>
      )}
    </Flexbox>
  );
};
