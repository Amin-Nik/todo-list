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
import { addNewLabel } from "./action";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { labelSchema } from "@/lib/zod/schema";
import { z } from "zod";

type LabelSchema = z.infer<typeof labelSchema>;

function NewLabelDialog({
  triggerChild,
  labelData,
}: {
  triggerChild: React.ReactNode;
  labelData: string[];
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LabelSchema>({
    resolver: zodResolver(labelSchema),
  });

  const onSubmit = async (data: LabelSchema) => {
    try {
      await addNewLabel(labelData, data.title);
      setOpen(false);
      reset();
    } catch (error) {
      const strError = error instanceof Error ? error.message : "Server error";
      setError("title", { type: "server", message: strError });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hover:bg-gray-700/50" asChild>
        {triggerChild}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Label</DialogTitle>
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
export default NewLabelDialog;
