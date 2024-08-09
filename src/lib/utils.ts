import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CellValue } from "../components/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function determineBorders(
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

export function checkLine(line: CellValue[]): CellValue {
  if (line.every((value) => value === CellValue.X)) {
    return CellValue.X;
  }

  if (line.every((value) => value === CellValue.O)) {
    return CellValue.O;
  }

  return CellValue.EMPTY;
}

export function checkWinner(board: CellValue[][]): CellValue {
  // Real quickness is to check cell by cell so you can short circuit the every logic
  // Syntactically beautiful way would be to do it line by line though.
  let winner = CellValue.EMPTY;

  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    winner = checkLine(row);

    if (winner !== CellValue.EMPTY) {
      return winner;
    }

    const column = board.map((row) => row[i]);
    winner = checkLine(column);

    if (winner !== CellValue.EMPTY) {
      return winner;
    }
  }

  const diagonal1 = [];
  const diagonal2 = [];

  for (let d = 0; d < board.length; d++) {
    diagonal1.push(board[d][d]);
    diagonal2.push(board[board.length - 1 - d][d]);
  }

  winner = checkLine(diagonal1);
  if (winner !== CellValue.EMPTY) {
    return winner;
  }

  winner = checkLine(diagonal2);
  if (winner !== CellValue.EMPTY) {
    return winner;
  }

  return winner;
}
