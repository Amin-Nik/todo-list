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
import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";

function NewLabelDialog({
  triggerChild,
  labelData,
}: {
  triggerChild: React.ReactNode;
  labelData: string[];
}) {
  const [open, setOpen] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [btnLoadingState, setBtnLoadingState] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setNewLabel("");
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
      await addNewLabel(labelData, newLabel);
      setBtnLoadingState(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      setNewLabel("");
      setBtnLoadingState(false);
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
            <Button
              disabled={btnLoadingState}
              onClick={() => setNewLabel("")}
              variant={"destructive"}
            >
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
export default NewLabelDialog;
