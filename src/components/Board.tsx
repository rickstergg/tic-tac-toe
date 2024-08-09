import { FC, useEffect, useState } from "react";
import { Flexbox } from "./layout";
import { CellValue } from "./types";
import { Cell } from "./Cell";

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
  const [board, setboard] = useState<CellValue[][] | undefined>(undefined);

  useEffect(() => {
    const emptyBoard: CellValue[][] = Array(size).fill(
      new Array(size).fill(CellValue.EMPTY),
    );
    setboard(emptyBoard);
  }, [size]);

  if (!board) {
    return <>'Initializing board..'</>;
  }

  return (
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
  );
};
