"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

const themes = ["1", "2", "3", "4", "5", "6"];

function ThemeSelector() {
  const [bodyClassName, setBodyClassName] = useState("");

  const handleClick = (theme: string) => {
    const body = document.body;
    const bodyClass = body.className;
    if (bodyClass.indexOf("-dark") !== -1) {
      body.classList.remove(bodyClass);
      body.classList.add(theme + "-dark");
      setBodyClassName(theme);
      window.localStorage.setItem("themeName", theme + "-dark");
    } else {
      body.classList.remove(bodyClass);
      body.classList.add(theme);
      setBodyClassName(theme);
      window.localStorage.setItem("themeName", theme);
    }
  };

  useEffect(() => {
    const body = document.body;
    const bodyClass = body.className;
    if (bodyClass.indexOf("-dark") !== -1) {
      const slicedBodyClass = bodyClass.slice(0, bodyClass.indexOf("-dark"));
      setBodyClassName(slicedBodyClass);
    } else setBodyClassName(bodyClass);
  }, []);

  return (
    <Popover modal={true}>
      <PopoverTrigger className="bg-[url(/colorful.jpg)] bg-cover bg-center rounded-b-3xl rounded-tl-xs rounded-tr-xs p-2 text-black border border-header-foreground">
        Themes
      </PopoverTrigger>
      <PopoverContent className="flex flex-col max-h-60 w-28 overflow-auto py-1.5 px-0">
        {themes.map((theme, index) => (
          <div className="flex items-center gap-2" key={index}>
            <button
              onClick={() => handleClick("theme" + theme)}
              className={`${
                bodyClassName == "theme" + theme ? "bg-accent" : ""
              } size-full py-1 my-0.5 hover:bg-accent`}
            >
              {"theme " + theme}
            </button>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default ThemeSelector;
