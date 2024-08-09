import { cva, VariantProps } from "class-variance-authority";
import { ElementRef, forwardRef, PropsWithChildren } from "react";
import { Box, BoxProps } from "./Box";
import { cn } from "../../lib/utils";

const config = cva(["flex"], {
  variants: {
    row: {
      true: "flex-row",
    },
    column: {
      true: "flex-col",
    },
    direction: {
      row: "flex-row",
      rowReverse: "flex-row-reverse",
      column: "flex-col",
      columnReverse: "flex-col-reverse",
    },
    grow: {
      true: "flex-grow",
      false: "flex-grow-0",
    },
    shrink: {
      true: "flex-shrink",
      false: "flex-shrink-0",
    },
    wrap: {
      true: "flex-wrap",
      reverse: "flex-wrap-reverse",
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
  },
  defaultVariants: {
    row: true,
  },
});

type FlexboxProps = PropsWithChildren<BoxProps> & VariantProps<typeof config>;

export const Flexbox = forwardRef<ElementRef<typeof Box>, FlexboxProps>((props, forwardedRef) => {
  const { children, className, direction, row, column, gap, grow, shrink, align, justify, wrap, ...rest } = props;

  return (
    <Box
      ref={forwardedRef}
      className={cn(
        config({
          direction,
          row,
          column,
          gap,
          align,
          justify,
          wrap,
          grow,
          shrink,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </Box>
  );
});
Flexbox.displayName = "Flexbox";
