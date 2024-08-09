import { FC, useCallback, useMemo, useState } from "react";
import { Flexbox } from "./layout";
import { CellValue } from "./types";
import { Cell } from "./Cell";
import { ResetButton } from "./ResetButton";
import { determineBorders } from "../lib/utils";

type Props = {
  size: number;
};

export const Board: FC<Props> = ({ size }) => {
  const defaultBoard = useMemo(() => {
    return Array.from({ length: size }, () =>
      new Array(size).fill(CellValue.EMPTY),
    );
  }, [size]);

  const [turn, setTurn] = useState<number>(0);
  const [board, setBoard] = useState<CellValue[][]>(defaultBoard);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    if (board[rowIndex][columnIndex] !== CellValue.EMPTY) {
      return;
    }

    const updatedBoard = board.slice().map((row) => row.slice());
    if (turn % 2 === 0) {
      updatedBoard[rowIndex][columnIndex] = CellValue.X;
    } else {
      updatedBoard[rowIndex][columnIndex] = CellValue.O;
    }

    setTurn(turn + 1);
    setBoard(updatedBoard);
  };

  const handleResetBoard = useCallback(() => {
    setTurn(0);
    setBoard(defaultBoard.slice());
  }, [size]);

  return (
    <>
      <ResetButton onReset={handleResetBoard} />
      <Flexbox className="text-6xl" column>
        {board.map((row, rowIndex) => {
          return (
            <Flexbox key={rowIndex}>
              {row.map((cellValue, columnIndex) => (
                <Cell
                  key={columnIndex}
                  classNames={determineBorders(rowIndex, columnIndex, size)}
                  value={cellValue}
                  onClick={() => handleCellClick(rowIndex, columnIndex)}
                />
              ))}
            </Flexbox>
          );
        })}
      </Flexbox>
    </>
  );
};
