import React from "react"
import { cn } from "@/lib/utils"

function SummaryCard({ title, value, icon: Icon, color = "text-primary", subtitle }) {
  return (
    <div
      data-slot="summary-card"
      className={cn(
        "group relative flex flex-col gap-4 rounded-[min(var(--radius-lg),12px)] border border-border/60 bg-card p-6",
        "shadow-sm transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/5",
        "active:translate-y-0 active:shadow-sm"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-[min(var(--radius-md),10px)] p-2.5",
            "bg-muted/60 text-muted-foreground transition-colors duration-300",
            `group-hover:${color}`,
            `[&>svg]:h-5 [&>svg]:w-5`
          )}
        >
          {Icon && <Icon className="h-5 w-5 transition-colors duration-300" aria-hidden="true" />}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span
          data-slot="summary-card-title"
          className="truncate text-sm font-medium text-muted-foreground"
          title={title}
        >
          {title}
        </span>
        <span
          data-slot="summary-card-value"
          className={cn(
            "truncate text-2xl font-bold tracking-tight",
            "text-foreground transition-colors duration-300",
            `group-hover:${color}`
          )}
        >
          {value}
        </span>
        {subtitle && (
          <span
            data-slot="summary-card-subtitle"
            className="truncate text-xs text-muted-foreground/70"
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )
}

export { SummaryCard }
