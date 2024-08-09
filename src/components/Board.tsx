import { FC } from "react";

type Props = {
  size: number;
};

export const Board: FC<Props> = ({ size }) => {
  return <>{size}</>;
};
