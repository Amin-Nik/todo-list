"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps } from "react-hook-form";

function DatePicker({
  taskDate,
  isDisabled,
  field,
}: {
  taskDate?: Date;
  isDisabled?: boolean;
  field: ControllerRenderProps<
    {
      id: string;
      date: unknown;
      description: string;
      isComplete: boolean;
      isImportant: boolean;
      labels: string[];
      title: string;
      userId: string;
    },
    "date"
  >;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(taskDate);

  useEffect(() => {
    setDate(taskDate);
  }, [taskDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-fit h-fit justify-start text-left font-normal border-ring px-2! py-1 cursor-pointer 
            ${!date && "text-muted-foreground"}
            ${
              isDisabled
                ? "bg-card hover:bg-card hover:text-card-foreground"
                : "bg-popover"
            }`}
        >
          <CalendarIcon />
          {date ? format(date, "PP") : <span>Select Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="pointer-events-auto"
          mode="single"
          selected={date}
          onSelect={(e) => {
            setDate(e);
            field.onChange(e ? e : null);
            setOpen(false);
          }}
          // onSelect={(e) => {
          //   setDate(e);
          //   if (setparentDate)
          //     setparentDate((task) => ({
          //       ...task,
          //       date: e == undefined ? null : e,
          //     }));
          //   setOpen(false);
          // }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
