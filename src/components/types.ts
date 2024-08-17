export enum CellValue {
  EMPTY = "-",
  X = "X",
  O = "O",
}

export type Result = {
  winner?: CellValue;
  row?: number;
  column?: number;
  diagonal?: 1 | 2;
};

export type ShortcutsProps = {
  preDescription?: string;
  keys: string[];
  postDescription?: string;
  className?: string;
};
