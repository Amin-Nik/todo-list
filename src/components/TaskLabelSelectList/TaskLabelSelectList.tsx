import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ControllerRenderProps } from "react-hook-form";

function TaskLabelSelectList({
  trigger,
  labels,
  field,
}: {
  trigger: React.ReactNode;
  labels: string[];
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
    "labels"
  >;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="flex flex-col max-h-60 w-60 overflow-auto py-4 px-0 pointer-events-auto">
        {labels.map((label, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Label
              onClick={() => {}}
              className="size-full py-2.5 px-4 hover:bg-accent"
              htmlFor={"label" + index}
            >
              <Checkbox
                onClick={() =>
                  field.onChange(
                    field.value.includes(label)
                      ? field.value.filter((l) => l !== label)
                      : [...field.value, label]
                  )
                }
                defaultChecked={field.value.includes(label)}
                className="text-green-500 bg-red-200 border-blue-500"
                id={"label" + index}
              />
              <span className="truncate">{label}</span>
            </Label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default TaskLabelSelectList;
