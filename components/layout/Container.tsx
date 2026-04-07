import { cn } from "@/lib/utils";
import { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className" | "as">;

export function Container<T extends ElementType = "div">({
  children,
  className,
  as,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";
  return (
    <Component className={cn("container-custom", className)} {...props}>
      {children}
    </Component>
  );
}
