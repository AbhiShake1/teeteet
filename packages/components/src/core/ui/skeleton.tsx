import { cn } from "@acme/utils"
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-secondary", className)}
      {...props}
    />
  )
}

export { Skeleton }
