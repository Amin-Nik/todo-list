"use client";
import { useState } from "react";
import { logOut } from "./action";

function LogOutButton({ nameOfTheUser }: { nameOfTheUser: string }) {
  const [logOutBtn, setLogOutBtn] = useState(false);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    await logOut();
  };

  const spanHandleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setLogOutBtn(false);
  };

  return (
    <div
      onClick={() => {
        setLogOutBtn(true);
      }}
      className="group relative flex flex-col justify-center items-center flex-grow w-20 min-w-20 max-w-60 h-10 mr-5"
    >
      <div
        className={`flex flex-col justify-center items-center inset-shadow-sm inset-shadow-black bg-background text-center w-full h-full truncate rounded p-1 sm:text-xl md:text-2xl text-lg overflow-hidden`}
      >
        <button
          onClick={handleClick}
          className={`cursor-pointer rounded w-full group-hover:h-full group-hover:text-xl group-hover:translate-y-4 ${
            logOutBtn ? "h-full text-xl translate-y-4" : "h-0 text-[0px]"
          } bg-destructive text-destructive-foreground transition-all duration-700`}
        >
          Log Out
        </button>
        <span
          className={`${
            logOutBtn && "translate-y-5"
          } group-hover:translate-y-5 transition-all duration-300`}
        >
          hi {nameOfTheUser}
        </span>
      </div>

      <span
        onClick={spanHandleClick}
        className={`-z-10 h-fit px-2 py-1 border-2 border-background/60 text-xl cursor-pointer absolute ${
          logOutBtn ? "translate-y-9" : ""
        } bg-background/40  group-hover:translate-y-9 transition-all duration-400`}
      >
        bye {nameOfTheUser}
      </span>
    </div>
  );
}

export default LogOutButton;
