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
} from "../ui/dialog";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Task } from "@prisma/client";
import DatePicker from "../DatePicker/DatePicker";
import { Textarea } from "../ui/textarea";
import TaskLabelSelectList from "../TaskLabelSelectList/TaskLabelSelectList";
import { editTask, addTask } from "./action";
import DeleteTaskDialog from "../DeleteTaskDialog/DeleteTaskDialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../lib/zod/schema";
import { z } from "zod";

type TaskSchema = z.infer<typeof taskSchema>;

function TaskExpandDialog({
  newTask,
  triggerChild,
  taskData,
  labels,
}: {
  newTask: boolean;
  triggerChild: React.ReactNode;
  taskData: Task;
  labels: string[];
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: taskData,
  });
  const watchLabel = watch("labels");

  useEffect(() => {
    reset(taskData);
  }, [reset, taskData]);

  const onSubmit = async (formData: TaskSchema) => {
    try {
      if (newTask) {
        const result = await addTask(formData);
        if (result.error)
          setError("root", { type: "server", message: result.error });
        else {
          reset();
          setOpen(false);
        }
      } else {
        const result = await editTask(formData, taskData);
        if (result.error)
          setError("root", { type: "server", message: result.error });
        else {
          reset();
          setOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const iconClassName = "size-6! inline-block";
  const BtnClassName = "cursor-pointer rounded-full p-1.5 hover:bg-accent";

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
        reset();
      }}
    >
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent className="md:min-w-3xl bg-popover text-popover-foreground">
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="mt-4 gap-2">
            <DialogTitle>
              <Input
                {...register("title")}
                className="text-foreground"
                placeholder="Title"
              />
              <p className="col-span-3 col-start-2 ml-2 mt-2 text-start text-base font-normal text-red-500 static">
                {errors.title?.message}
              </p>
            </DialogTitle>
            <DialogDescription className="line-clamp-2">
              <Textarea
                {...register("description")}
                className="resize-none max-h-36"
                placeholder="description"
              />
            </DialogDescription>
            <p className="col-span-3 col-start-2 ml-2 text-start text-base font-normal text-red-500 static">
              {errors.description?.message}
            </p>
            <p className="col-span-3 col-start-2 ml-2 text-start text-base font-normal text-red-500 static">
              {errors.root?.message}
            </p>
          </DialogHeader>
          {/* Label Section */}
          <div className="max-h-36 flex py-2 flex-wrap overflow-auto gap-1 items-center">
            {watchLabel.map((label, index) => (
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
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  field={field}
                  taskDate={(field.value as Date) ?? undefined}
                />
              )}
            />
            <div>
              <Controller
                name="isImportant"
                control={control}
                render={({ field }) => (
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={BtnClassName}
                  >
                    {field.value ? (
                      <StarIcon className={iconClassName} />
                    ) : (
                      <StarIconOutline className={iconClassName} />
                    )}
                  </button>
                )}
              />
              <Controller
                name="labels"
                control={control}
                render={({ field }) => (
                  <TaskLabelSelectList
                    field={field}
                    labels={labels}
                    trigger={
                      <button className={BtnClassName}>
                        <TagIcon className={iconClassName} />
                      </button>
                    }
                  />
                )}
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
            <Controller
              name="isComplete"
              control={control}
              render={({ field }) => (
                <Button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className="bg-isComplete hover:bg-isComplete/90 text-isComplete-foreground"
                >
                  {field.value ? (
                    <>
                      Mark As Undone
                      <CheckCircleIcon
                        className={`${iconClassName} text-green-300`}
                      />
                    </>
                  ) : (
                    <>
                      Mark As Done
                      <CheckCircleIconOutline className={iconClassName} />
                    </>
                  )}
                </Button>
              )}
            />
            <DialogClose asChild>
              <Button disabled={isSubmitting} variant={"destructive"}>
                Cancel
              </Button>
            </DialogClose>
            {isSubmitting ? (
              <Button disabled>
                <LoaderCircle className="animate-spin" />
                please wait...
              </Button>
            ) : (
              <Button type="submit">Save</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default TaskExpandDialog;
