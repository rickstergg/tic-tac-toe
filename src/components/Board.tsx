import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { determineBorders, getResult } from "../lib/utils";
import { Cell } from "./Cell";
import { ResetButton } from "./ResetButton";
import { Winner } from "./Winner";
import { Flexbox } from "./layout";
import { CellValue, Result } from "./types";
import { useKeyPress } from "../hooks/useKeyPress";
import { useToast } from "./ui/use-toast";

type Props = {
  size: number;
};

type Move = {
  rowIndex: number;
  columnIndex: number;
};

export const Board: FC<Props> = ({ size }) => {
  const [turn, setTurn] = useState<number>(0);
  const [isTie, setIsTie] = useState<boolean>(false);
  const [result, setResult] = useState<Result>({});
  const [moves, setMoves] = useState<Move[]>([]);

  const defaultBoard = useMemo(() => {
    return Array.from({ length: size }, () =>
      new Array(size).fill(CellValue.EMPTY),
    );
  }, [size]);

  const [board, setBoard] = useState<CellValue[][]>(defaultBoard);

  const { toast } = useToast();

  const handleResetBoard = useCallback(() => {
    setTurn(0);
    setBoard(defaultBoard.slice());
    setIsTie(false);
    setResult({});
    setMoves([]);
  }, [size]);

  const handleUndo = useCallback(() => {
    if (moves.length === 0) {
      toast({
        title: "No move to undo!",
      });
      return;
    }

    if (result.winner || isTie) {
      toast({
        title: "Cannot undo completed game!",
      });
      return;
    }

    setTurn(turn - 1);
    const lastMove = moves.pop() as Move;
    setMoves(moves);
    const updatedboard = board.slice().map((row) => row.slice());
    updatedboard[lastMove.rowIndex][lastMove.columnIndex] = CellValue.EMPTY;
    setBoard(updatedboard);
  }, [turn, isTie, result.winner]);

  useKeyPress("r", {
    callback: () => handleResetBoard(),
  });

  useKeyPress(["Meta+z", "Ctrl+z"], {
    callback: () => handleUndo(),
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
    setMoves((prev) => [...prev, { rowIndex, columnIndex }]);
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
