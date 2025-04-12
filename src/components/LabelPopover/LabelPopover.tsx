import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function LabelPopover({
  trigger,
  labels,
  taskLabels,
  setparentLabels,
}: {
  trigger: React.ReactNode;
  labels: string[];
  taskLabels: string[];
  setparentLabels: React.Dispatch<
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
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="flex flex-col max-h-60 w-60 overflow-auto py-4 px-0">
        {labels.map((label, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Label
              onClick={() => {}}
              className="size-full py-2.5 px-4 hover:bg-gray-200"
              htmlFor={"label" + index}
            >
              <Checkbox
                onClick={() => {
                  setparentLabels((task) => ({
                    ...task,
                    labels: taskLabels.includes(label)
                      ? taskLabels.filter((l) => l !== label)
                      : [...taskLabels, label],
                  }));
                }}
                defaultChecked={taskLabels.includes(label)}
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

export default LabelPopover;
