"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DatePicker({
  taskDate,
  isDisabled,
  setparentDate,
}: {
  taskDate: Date | undefined;
  isDisabled?: boolean;
  setparentDate?: React.Dispatch<
    React.SetStateAction<{
      title: string;
      id: string;
      date: Date | null;
      description: string;
      isComplete: boolean;
      isImportant: boolean;
      labels: string[];
      userId: string;
    }>
  >;
}) {
  const [date, setDate] = useState(taskDate);

  useEffect(() => {
    setDate(taskDate);
  }, [taskDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-fit h-fit justify-start text-left font-normal border-black px-2! py-1",
            !date && "text-muted-foreground",
            isDisabled ? "hover:bg-white" : "hover:bg-black/10"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PP") : <span>No Date Selected</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => {
            setDate(e);
            if (setparentDate)
              setparentDate((task) => ({
                ...task,
                date: e == undefined ? null : e,
              }));
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
