import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Flexbox } from "./layout";
import { CellValue } from "./types";
import { Cell } from "./Cell";
import { ResetButton } from "./ResetButton";
import { checkWinner, determineBorders } from "../lib/utils";
import { Result } from "./Result";

type Props = {
  size: number;
};

export const Board: FC<Props> = ({ size }) => {
  const [turn, setTurn] = useState<number>(0);
  const [winner, setWinner] = useState<CellValue | undefined>();
  const [isTie, setIsTie] = useState<boolean>(false);

  const defaultBoard = useMemo(() => {
    return Array.from({ length: size }, () =>
      new Array(size).fill(CellValue.EMPTY),
    );
  }, [size]);

  const [board, setBoard] = useState<CellValue[][]>(defaultBoard);

  const handleResetBoard = useCallback(() => {
    setTurn(0);
    setBoard(defaultBoard.slice());
    setWinner(undefined);
    setIsTie(false);
  }, [size]);

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    if (winner || board[rowIndex][columnIndex] !== CellValue.EMPTY) {
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
    const winner = checkWinner(board);
    if (winner !== CellValue.EMPTY) {
      setWinner(winner);
    }

    if (turn === size * size) {
      setIsTie(true);
    }
  }, [turn]);

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
      <Result isTie={isTie} winner={winner} />
    </>
  );
};
