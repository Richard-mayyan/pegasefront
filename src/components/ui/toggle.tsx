"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    type?: "single" | "multiple";
    defaultValue?: string | string[];
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
  }
>(
  (
    {
      className,
      children,
      type = "single",
      defaultValue,
      value,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<
      string | string[] | undefined
    >(defaultValue);

    const controlled = typeof value !== "undefined";

    const currentValue = controlled ? value : internalValue;

    const handleValueChange = (newValue: string | string[]) => {
      if (!controlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const getButtonProps = (buttonValue: string) => {
      const selected =
        type === "single"
          ? currentValue === buttonValue
          : Array.isArray(currentValue)
          ? currentValue.includes(buttonValue)
          : false;

      return {
        "data-state": selected ? "on" : "off",
        onClick: () => {
          if (type === "single") {
            handleValueChange(selected ? "" : buttonValue);
          } else {
            if (Array.isArray(currentValue)) {
              const newValue = selected
                ? currentValue.filter((v) => v !== buttonValue)
                : [...currentValue, buttonValue];
              handleValueChange(newValue);
            } else {
              handleValueChange([buttonValue]);
            }
          }
        },
      };
    };

    return (
      <div className="flex items-center space-x-2">
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            (child as any).type === ToggleGroupItem
          ) {
            const buttonValue = (child as any).props.value;
            return React.cloneElement(child, {
              ...getButtonProps(buttonValue),
            });
          }
          return child;
        })}
      </div>
    );
  }
);
ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    value: string;
  }
>(({ className, value, ...props }, ref) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("", className)}
      {...props}
      ref={ref}
    />
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
