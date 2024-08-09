import { FC, useMemo, useState } from "react";
import { Flexbox } from "./layout";
import { CellValue } from "./types";
import { Cell } from "./Cell";
import { RotateCcw } from "lucide-react";
import { ResetButton } from "./ResetButton";

type Props = {
  size: number;
};

function determineBorders(
  rowIndex: number,
  columnIndex: number,
  boardSize: number,
): string {
  const borderClasses = [];
  if (rowIndex > 0) {
    borderClasses.push("border-t-2");
  }

  if (rowIndex < boardSize - 1) {
    borderClasses.push("border-b-2");
  }

  if (columnIndex > 0) {
    borderClasses.push("border-l-2");
  }

  if (columnIndex < boardSize - 1) {
    borderClasses.push("border-r-2");
  }

  if (borderClasses.length === 4) {
    return "border-2";
  }

  return borderClasses.join(" ");
}

export const Board: FC<Props> = ({ size }) => {
  const defaultBoard = useMemo(() => {
    return Array(size).fill(new Array(size).fill(CellValue.EMPTY));
  }, [size]);

  const [board, setBoard] = useState<CellValue[][]>(defaultBoard);

  return (
    <>
      <ResetButton onReset={() => setBoard(defaultBoard)} />
      <Flexbox column>
        {board.map((row, rowIndex) => {
          return (
            <Flexbox key={rowIndex}>
              {row.map((cellValue, columnIndex) => (
                <Cell
                  key={columnIndex}
                  classNames={determineBorders(rowIndex, columnIndex, size)}
                  value={cellValue}
                />
              ))}
            </Flexbox>
          );
        })}
      </Flexbox>
    </>
  );
};
