import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
