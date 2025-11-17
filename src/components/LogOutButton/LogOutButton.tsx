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
        className={`flex flex-col justify-center items-center inset-shadow-sm inset-shadow-black bg-background text-center w-full h-full truncate rounded px-1 sm:text-xl md:text-2xl text-lg`}
      >
        <button
          onClick={handleClick}
          className={`cursor-pointer rounded w-full group-hover:h-full group-hover:text-xl group-hover:mt-1.5 ${
            logOutBtn ? "h-full text-xl mt-1.5" : "h-0 text-[0px]"
          } bg-destructive text-destructive-foreground transition-all duration-700`}
        >
          Log Out
        </button>
        <span
          className={`${
            logOutBtn && "translate-y-5"
          } px-1 max-w-full max-h-full truncate group-hover:translate-y-5 transition-all duration-300`}
        >
          hi {nameOfTheUser}
        </span>
        <span
          onClick={spanHandleClick}
          className={`-z-10 h-fit px-2 py-1 border-2 border-background/60 text-xl cursor-pointer absolute ${
            logOutBtn ? "translate-y-9" : ""
          } max-w-full max-h-full truncate bg-background/40  group-hover:translate-y-9 transition-all duration-400`}
        >
          bye {nameOfTheUser}
        </span>
      </div>
    </div>
  );
}

export default LogOutButton;
