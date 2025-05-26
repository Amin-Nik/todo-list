"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  StarIcon as StarIconOutline,
  TagIcon,
  CheckCircleIcon as CheckCircleIconOutline,
} from "@heroicons/react/24/outline";
import {
  StarIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Task } from "@prisma/client";
import DatePicker from "../DatePicker/DatePicker";
import { Textarea } from "../ui/textarea";
import LabelPopover from "../LabelPopover/LabelPopover";
import { editTask, addTask } from "./action";
import DeleteTaskDialog from "../DeleteTaskDialog/DeleteTaskDialog";

function TaskExpandDialog({
  newTask = false,
  triggerChild,
  data,
  labels,
}: {
  newTask?: boolean;
  triggerChild: React.ReactNode;
  data: Task;
  labels: string[];
}) {
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState<Task>(data);
  const [btnLoadingState, setBtnLoadingState] = useState(false);

  useEffect(() => {
    setTaskData(data);
  }, [open]);

  const handleClickEdit = async () => {
    try {
      setBtnLoadingState(true);
      await editTask(taskData, data);
      setBtnLoadingState(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      setBtnLoadingState(false);
    }
  };
  const handleClickAdd = async () => {
    try {
      setBtnLoadingState(true);
      await addTask(taskData);
      setBtnLoadingState(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      setBtnLoadingState(false);
    }
  };

  const iconClassName = "size-6! inline-block";
  const BtnClassName = "cursor-pointer rounded-full p-1.5 hover:bg-accent";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent className="md:min-w-3xl bg-popover text-popover-foreground">
        <DialogHeader className="mt-4 gap-2">
          <DialogTitle>
            <Input
              className="text-foreground"
              placeholder="Title"
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              value={taskData.title}
            />
          </DialogTitle>
          <DialogDescription className="line-clamp-2">
            <Textarea
              className="resize-none max-h-36"
              placeholder="description"
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              value={taskData.description}
            />
          </DialogDescription>
        </DialogHeader>
        {/* Label Section */}
        <div className="max-h-36 flex py-2 flex-wrap overflow-auto gap-1 items-center">
          {taskData.labels.map((label, index) => (
            <div
              key={index}
              className="border border-foreground rounded-full px-2 py-1 text-xs font-semibold line-clamp-3}"
            >
              {label}
            </div>
          ))}
        </div>
        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          <DatePicker
            setparentDate={setTaskData}
            taskDate={taskData.date == null ? undefined : taskData.date}
          />
          <div>
            {taskData.isImportant ? (
              <button
                onClick={() => setTaskData({ ...taskData, isImportant: false })}
                className={BtnClassName}
              >
                <StarIcon className={`${iconClassName}`} />
              </button>
            ) : (
              <button
                onClick={() => setTaskData({ ...taskData, isImportant: true })}
                className={BtnClassName}
              >
                <StarIconOutline className={iconClassName} />
              </button>
            )}
            <LabelPopover
              setparentLabels={setTaskData}
              taskLabels={taskData.labels}
              labels={labels}
              trigger={
                <button className={BtnClassName}>
                  <TagIcon className={iconClassName} />
                </button>
              }
            />
            {newTask || (
              <DeleteTaskDialog
                triggerChild={
                  <button className={BtnClassName}>
                    <TrashIcon className={iconClassName} />
                  </button>
                }
                taskId={taskData.id}
              />
            )}
          </div>
        </div>

        <DialogFooter>
          {taskData.isComplete ? (
            <Button
              className="bg-isComplete hover:bg-isComplete/90 text-isComplete-foreground"
              onClick={() => setTaskData({ ...taskData, isComplete: false })}
            >
              Mark As Undone
              <CheckCircleIcon className={`${iconClassName} text-green-300`} />
            </Button>
          ) : (
            <Button
              className="bg-isComplete hover:bg-isComplete/90 text-isComplete-foreground"
              onClick={() => setTaskData({ ...taskData, isComplete: true })}
            >
              Mark As Done
              <CheckCircleIconOutline className={iconClassName} />
            </Button>
          )}

          <DialogClose asChild>
            <Button disabled={btnLoadingState} variant={"destructive"}>
              Cancel
            </Button>
          </DialogClose>
          {btnLoadingState ? (
            <Button disabled>
              <LoaderCircle className="animate-spin" />
              please wait...
            </Button>
          ) : (
            <Button onClick={newTask ? handleClickAdd : handleClickEdit}>
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default TaskExpandDialog;
