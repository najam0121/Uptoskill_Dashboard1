import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps;

function Calendar({ className,
  classNames,
  showOutsideDays = true,
  ...props
 }) {
  return (
     ,
        IconRight) => ,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };


