import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export const Calendar: React.FC<CalendarProps> = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  const [month, setMonth] = React.useState(new Date())

  return (
    <div className={cn("p-3", className)}>
      {/* Custom header with left/right buttons */}
      <div className="flex justify-between items-center mb-2">
        <button
          type="button"
          onClick={() =>
            setMonth(
              new Date(month.getFullYear(), month.getMonth() - 1, 1)
            )
          }
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 flex items-center justify-center p-0"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          {month.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          type="button"
          onClick={() =>
            setMonth(
              new Date(month.getFullYear(), month.getMonth() + 1, 1)
            )
          }
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 flex items-center justify-center p-0"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <DayPicker
        month={month}
        onMonthChange={setMonth}
        showOutsideDays={showOutsideDays}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "hidden", // hide default caption
          table: "w-full border-collapse",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative",
          day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal"),
          day_selected: "bg-primary text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_outside: "text-muted-foreground opacity-50",
          ...classNames,
        }}
        {...props}
      />
    </div>
  )
}

Calendar.displayName = "Calendar"
