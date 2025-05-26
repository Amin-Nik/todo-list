"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { deleteLabel } from "./action";

function DeleteLabelDialog({
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
  const [btnLoadingState, setBtnLoadingState] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteHandler = async () => {
    try {
      setBtnLoadingState(true);
      await deleteLabel(labelData, currentLabel);
      setBtnLoadingState(false);
      setOpen(false);
      setActiveBtn((e) => (e == currentLabel ? " All Task " : e));
    } catch (error) {
      console.log(error);
      setBtnLoadingState(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2 w-full">
            <AlertCircle className="size-5" />
            Are You Sure?
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Label htmlFor="name" className="w-full truncate h-7 text-base">
          {`you are about to delete this label: ${currentLabel}`}
        </Label>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={btnLoadingState}>Cancel</Button>
          </DialogClose>
          {btnLoadingState ? (
            <Button variant={"destructive"} disabled>
              <LoaderCircle className="animate-spin" />
              please wait...
            </Button>
          ) : (
            <Button variant={"destructive"} onClick={deleteHandler}>
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteLabelDialog;
