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
import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { editLabel } from "./action";

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
  const [newLabel, setNewLabel] = useState(currentLabel);
  const [btnLoadingState, setBtnLoadingState] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setNewLabel(currentLabel);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
  };

  const handleClick = async () => {
    try {
      setBtnLoadingState(true);
      const newLabelResponse = await editLabel(
        labelData,
        newLabel,
        currentLabel
      );
      setNewLabel(newLabelResponse);
      setBtnLoadingState(false);
      setOpen(false);
      setActiveBtn((e) => (e == currentLabel ? newLabel : e));
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
          <DialogTitle>Edit Label</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              onKeyDown={handleKeyDown}
              onChange={(e) => setNewLabel(e.target.value)}
              value={newLabel}
              id="name"
              placeholder="New Label 1"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
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
            <Button ref={buttonRef} onClick={handleClick}>
              Save
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default EditLabelDialog;
