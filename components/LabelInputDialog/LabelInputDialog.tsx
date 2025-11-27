"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { labelSchema } from "../../lib/zod/schema";
import { Button } from "../ui/button";
import { editLabel, newLabel } from "./action";
import { zodResolver } from "@hookform/resolvers/zod";

type LabelSchema = z.infer<typeof labelSchema>;

function LabelInputDialog({
  triggerChild,
  labelData,
  currentLabel,
  setActiveBtn,
  isNew,
}: {
  triggerChild: React.ReactNode;
  labelData: string[];
  currentLabel: string;
  setActiveBtn: React.Dispatch<React.SetStateAction<string>>;
  isNew: boolean;
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
      if (isNew) {
        const result = await newLabel(labelData, data.title);
        if (result.error)
          setError("title", { type: "server", message: result.error });
        else {
          reset();
          setOpen(false);
        }
      } else {
        const result = await editLabel(labelData, data.title, currentLabel);
        if (result.error)
          setError("title", { type: "server", message: result.error });
        else {
          setActiveBtn((e) => (e == currentLabel ? data.title : e));
          reset(data);
          setOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
      setError("title", { type: "server", message: "something went wrong!" });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
        reset();
      }}
    >
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent aria-describedby="">
        <DialogHeader>
          <DialogTitle>{isNew ? "Add New Label" : "Edit Label"}</DialogTitle>
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
              <Button disabled={isSubmitting} variant={"destructive"}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  please wait...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LabelInputDialog;
