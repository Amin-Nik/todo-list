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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { editLabel } from "./action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { labelSchema } from "@/lib/zod/schema";
import { z } from "zod";

type LabelSchema = z.infer<typeof labelSchema>;

function EditLabelDialog({
  triggerChild,
  labelData,
  currentLabel,
  setActiveBtn,
}: {
  triggerChild: React.ReactNode;
  labelData: string[];
  currentLabel: string;
  setActiveBtn: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LabelSchema>({
    defaultValues: { title: currentLabel },
    resolver: zodResolver(labelSchema),
  });

  const onSubmit = async (data: LabelSchema) => {
    try {
      await editLabel(labelData, data.title, currentLabel);
      setOpen(false);
      setActiveBtn((e) => (e == currentLabel ? data.title : e));
      reset(data);
    } catch (error) {
      const strError = error instanceof Error ? error.message : "Server error";
      setError("title", { type: "server", message: strError });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Label</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                {...register("title")}
                id="name"
                placeholder="New Label 1"
                className="col-span-3"
              />
              <p className="col-span-3 col-start-2 pb-4 ml-2 text-start text-red-500 static">
                {errors.title?.message}
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={isSubmitting}
                onClick={() => reset()}
                variant={"destructive"}
              >
                Cancel
              </Button>
            </DialogClose>
            {isSubmitting ? (
              <Button disabled>
                <LoaderCircle className="animate-spin" />
                please wait...
              </Button>
            ) : (
              <Button>Save</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default EditLabelDialog;
