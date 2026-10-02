import { cn } from "@/lib/utils"
import type { Tally } from "@/lib/analytics"

export function UsageBar({ item, accent = "bg-primary" }: { item: Tally; accent?: string }) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{item.label}</span>
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          {item.pct}% · {item.count}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-700", accent)}
          style={{ width: `${Math.max(4, item.pct)}%` }}
        />
      </div>
    </div>
  )
}
