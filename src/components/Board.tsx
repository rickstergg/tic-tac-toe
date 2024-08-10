import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { determineBorders, getResult } from "../lib/utils";
import { Cell } from "./Cell";
import { ResetButton } from "./ResetButton";
import { Winner } from "./Winner";
import { Flexbox } from "./layout";
import { CellValue, Result } from "./types";
import { useKeyPress } from "../hooks/useKeyPress";

type Props = {
  size: number;
};

export const Board: FC<Props> = ({ size }) => {
  const [turn, setTurn] = useState<number>(0);
  const [isTie, setIsTie] = useState<boolean>(false);
  const [result, setResult] = useState<Result>({});

  const defaultBoard = useMemo(() => {
    return Array.from({ length: size }, () =>
      new Array(size).fill(CellValue.EMPTY),
    );
  }, [size]);

  const [board, setBoard] = useState<CellValue[][]>(defaultBoard);

  const handleResetBoard = useCallback(() => {
    setTurn(0);
    setBoard(defaultBoard.slice());
    setIsTie(false);
    setResult({});
  }, [size]);

  useKeyPress("Escape", {
    callback: () => handleResetBoard(),
  });

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    if (result.winner || board[rowIndex][columnIndex] !== CellValue.EMPTY) {
      return;
    }

    const updatedBoard = board.slice().map((row) => row.slice());

    turn % 2 === 0
      ? (updatedBoard[rowIndex][columnIndex] = CellValue.X)
      : (updatedBoard[rowIndex][columnIndex] = CellValue.O);

    setTurn(turn + 1);
    setBoard(updatedBoard);
  };

  useEffect(() => {
    const result = getResult(board);
    if (result.winner) {
      setResult(result);
    }
  }, [turn]);

  useEffect(() => {
    if (turn === size * size) {
      setIsTie(true);
    }
  }, [turn]);

  return (
    <>
      <ResetButton onReset={handleResetBoard} />
      <Flexbox className="text-6xl select-none" column>
        {board.map((row, rowIndex) => {
          return (
            <Flexbox key={rowIndex}>
              {row.map((cellValue, columnIndex) => (
                <Cell
                  key={columnIndex}
                  classNames={determineBorders(rowIndex, columnIndex, size)}
                  onClick={() => handleCellClick(rowIndex, columnIndex)}
                  result={result}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  value={cellValue}
                  size={size}
                />
              ))}
            </Flexbox>
          );
        })}
      </Flexbox>
      <Winner isTie={isTie} winner={result.winner} />
    </>
  );
};
