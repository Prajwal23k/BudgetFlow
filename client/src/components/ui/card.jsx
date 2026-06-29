import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({ className, variant, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col gap-y-1.5 p-6 has-data-[slot=card-action]:flex-row has-data-[slot=card-action]:items-center has-data-[slot=card-action]:justify-between",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "ml-auto flex items-center gap-1.5 self-start",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 pb-6", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter }
