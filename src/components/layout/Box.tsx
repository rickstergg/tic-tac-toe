import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";

const config = cva(undefined, {
  variants: {
    relative: {
      true: "relative",
    },
    width: {
      full: "w-full",
      screen: "w-screen",
    },
    maxWidth: {
      full: "max-w-full",
    },
    height: {
      full: "h-full",
      screen: "h-screen",
    },
    maxHeight: {
      full: "max-h-full",
    },
    elevation: {
      low: "shadow-sm",
      base: "shadow-md",
      high: "shadow-lg",
    },
    overflowY: {
      auto: "overflow-y-auto",
      hidden: "hidden",
    },
    overflowX: {
      auto: "overflow-x-auto",
      hidden: "overflow-x-hidden",
    },
    overflow: {
      auto: "overflow-auto",
      hidden: "overflow-hidden",
    },
    borderRadius: {
      lg: "rounded-lg",
      md: "rounded-md",
      sm: "rounded-sm",
    },
  },
});

export type BoxProps = PropsWithChildren<{
  className?: string;
  asChild?: boolean;
  as?: "div" | "section" | "main" | "article" | "aside" | "header" | "footer" | "nav";
  onClick?: () => void;
}> &
  VariantProps<typeof config> &
  HTMLAttributes<HTMLDivElement>;

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, forwardedRef) => {
  const {
    children,
    className,
    asChild,
    elevation,
    width,
    maxWidth,
    height,
    overflow,
    overflowY,
    overflowX,
    relative,
    ...rest
  } = props;

  const Component = asChild ? Slot : props.as ?? "div";

  // Safeguard against passing `as` to a child slot component
  if ("as" in rest) {
    delete rest.as;
  }

  return (
    <Component
      ref={forwardedRef}
      className={cn(
        config({
          elevation,
          width,
          maxWidth,
          height,
          overflow,
          overflowY,
          overflowX,
          relative,
        }),
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});
Box.displayName = "Box";
