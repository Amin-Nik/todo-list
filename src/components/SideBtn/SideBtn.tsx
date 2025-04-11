"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

function SideBtn({
  icon,
  text,
  clickHandler,
  editAndDeleteIcon,
  activeBtn,
  setActiveBtn,
  toggleSideBar,
}: {
  icon: React.ReactNode;
  text: string;
  clickHandler: () => number;
  editAndDeleteIcon?: React.ReactNode;
  activeBtn: string;
  setActiveBtn: React.Dispatch<React.SetStateAction<string>>;
  toggleSideBar: boolean;
}) {
  const [taskLength, setTaskLength] = useState(0);

  useEffect(() => {
    if (text == "All Task") {
      const count = clickHandler();
      setTaskLength(count);
    }
  }, []);

  return (
    <div className="relative group">
      <Button
        onClick={() => {
          setActiveBtn(text);
          const count = clickHandler();
          setTaskLength(count);
        }}
        className={`hover:bg-gray-700/50 transition-all transition-discrete duration-300 h-12 w-12  justify-start gap-4 ${
          activeBtn == text && "bg-amber-700"
        } ${toggleSideBar ? "w-full rounded-r-full! pl-6!" : "rounded-full"}`}
      >
        {icon}
        {toggleSideBar && (
          <>
            <span className="w-3/5 truncate">{text}</span>
            {activeBtn == text && (
              <Label className="flex justify-center items-center rounded-full p-1.5 bg-red-950">
                {taskLength}
              </Label>
            )}
          </>
        )}
      </Button>
      {toggleSideBar && editAndDeleteIcon}
    </div>
  );
}

export default SideBtn;
