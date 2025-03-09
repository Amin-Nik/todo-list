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

function EditLabelDialog({
  triggerChild,
  labelData,
  currentLabel,
}: {
  triggerChild: React.ReactNode;
  labelData: string[];
  currentLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [newLabel, setNewLabel] = useState(currentLabel);
  const [btnLoadingState, setBtnLoadingState] = useState(false);

  const handleClick = async () => {
    try {
      setBtnLoadingState(true);
      await editLabel(labelData, newLabel, currentLabel);
      setOpen(false);
      setNewLabel(newLabel);
      setBtnLoadingState(false);
    } catch (error) {
      alert(error);
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
            <Button onClick={handleClick}>Save</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default EditLabelDialog;
