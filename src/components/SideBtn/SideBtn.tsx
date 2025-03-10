"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

function SideBtn({
  icon,
  text,
  clickHandler,
  editAndDeleteIcon,
  activeBtn,
  setActiveBtn,
  allTasksLength,
}: {
  icon: React.ReactNode;
  text: string;
  addNew?: boolean;
  clickHandler: () => number | undefined;
  editAndDeleteIcon?: React.ReactNode;
  activeBtn: string;
  setActiveBtn: React.Dispatch<React.SetStateAction<string>>;
  allTasksLength?: number | undefined;
}) {
  const [taskCount, setTaskCount] = useState<number | undefined>(
    allTasksLength
  );

  return (
    <div className="relative group">
      <Button
        onClick={() => {
          setActiveBtn(text);
          const count = clickHandler();
          setTaskCount(count);
        }}
        className={`${
          activeBtn == text && "bg-amber-700"
        } transition transition-discrete w-full h-12 rounded-r-full justify-start gap-4`}
      >
        {icon}
        <span className="w-3/5 truncate">{text}</span>
        {activeBtn == text && (
          <Label className="flex justify-center items-center rounded-full p-1.5 bg-red-950">
            {taskCount}
          </Label>
        )}
      </Button>
      {editAndDeleteIcon}
    </div>
  );
}

export default SideBtn;
