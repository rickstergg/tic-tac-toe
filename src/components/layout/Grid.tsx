import { cva, VariantProps } from "class-variance-authority";
import { ElementRef, forwardRef, PropsWithChildren } from "react";
import { Box, BoxProps } from "./Box";
import { cn } from "../../lib/utils";

const config = cva(["grid"], {
  variants: {
    cols: {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    },
    subgrid: {
      true: "grid-cols-subgrid",
    },
    flow: {
      row: "grid-flow-row",
      column: "grid-flow-col",
      dense: "grid-flow-dense",
      rowDense: "grid-flow-row-dense",
      colDense: "grid-flow-col-dense",
    },
    autoCols: {
      auto: "grid-auto-cols-auto",
      min: "grid-auto-cols-min",
      max: "grid-auto-cols-max",
      fr: "grid-auto-cols-fr",
    },
    autoRows: {
      auto: "grid-auto-rows-auto",
      min: "grid-auto-rows-min",
      max: "grid-auto-rows-max",
      fr: "grid-auto-rows-fr",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    gap: {
      0: "gap-0",
      0.5: "gap-0.5",
      1: "gap-1",
      1.5: "gap-1.5",
      2: "gap-2",
      2.5: "gap-2.5",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      7: "gap-7",
      8: "gap-8",
      9: "gap-9",
      10: "gap-10",
      12: "gap-12",
    },
    gapX: {
      0: "gap-x-0",
      0.5: "gap-x-0.5",
      1: "gap-x-1",
      1.5: "gap-x-1.5",
      2: "gap-x-2",
      2.5: "gap-x-2.5",
      3: "gap-x-3",
      4: "gap-x-4",
      5: "gap-x-5",
      6: "gap-x-6",
      7: "gap-x-7",
      8: "gap-x-8",
      9: "gap-x-9",
      10: "gap-x-10",
      12: "gap-x-12",
    },
    gapY: {
      0: "gap-y-0",
      0.5: "gap-y-0.5",
      1: "gap-y-1",
      1.5: "gap-y-1.5",
      2: "gap-y-2",
      2.5: "gap-y-2.5",
      3: "gap-y-3",
      4: "gap-y-4",
      5: "gap-y-5",
      6: "gap-y-6",
      7: "gap-y-7",
      8: "gap-y-8",
      9: "gap-y-9",
      10: "gap-y-10",
      12: "gap-y-12",
    },
  },
});

type GridProps = PropsWithChildren<BoxProps> & VariantProps<typeof config>;

export const Grid = forwardRef<ElementRef<typeof Box>, GridProps>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      gap,
      gapX,
      gapY,
      align,
      justify,
      cols,
      subgrid,
      flow,
      autoCols,
      autoRows,
      ...rest
    } = props;

    return (
      <Box
        ref={forwardedRef}
        className={cn(
          config({
            gap,
            gapX,
            gapY,
            align,
            justify,
            cols,
            subgrid,
            flow,
            autoCols,
            autoRows,
          }),
          className,
        )}
        {...rest}
      >
        {children}
      </Box>
    );
  },
);
Grid.displayName = "Grid";
