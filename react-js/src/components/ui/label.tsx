"use client";

import * as React from "react";

import { Field as FieldPrimitive } from "@base-ui-components/react";

import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Label>) {
  return (
    <FieldPrimitive.Root>
      <FieldPrimitive.Label
        data-slot="label"
        className={cn(
          "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className
        )}
        {...props}
      />
    </FieldPrimitive.Root>
  );
}
export { Label };
