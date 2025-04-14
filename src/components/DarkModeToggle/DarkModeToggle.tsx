"use client";
import { useState } from "react";

function DarkModeToggle() {
  const [classes, setClasses] = useState(true);

  const handleClick = () => {
    setClasses(!classes);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer rounded-full transition-all duration-500 ease-in-out"
      style={{
        fontSize: "15%",
        height: "16em",
        width: "30em",
        backgroundColor: classes ? "#423966" : "#ffbf71",
      }}
    >
      {classes ? (
        <div
          className="absolute block rounded-full transition-all duration-400 ease-in-out"
          style={{
            top: "3em",
            left: "3em",
            width: "10em",
            height: "10em",
            backgroundColor: "#423966",
            transform: "rotate(-75deg)",
            boxShadow: `
              inset 3em 2.5em 0 0em #d9fbff,
              0em -7em 0 -4.5em rgba(255,255,255,0.1),
              3em 7em 0 -4.5em rgba(255,255,255,0.1),
              2em 13em 0 -4em rgba(255,255,255,0.1),
              6em 2em 0 -4.1em rgba(255,255,255,0.1),
              8em 8em 0 -4.5em rgba(255,255,255,0.1),
              6em 13em 0 -4.5em rgba(255,255,255,0.1),
              -4em 7em 0 -4.5em rgba(255,255,255,0.1),
              -1em 10em 0 -4.5em rgba(255,255,255,0.1)
            `,
          }}
        ></div>
      ) : (
        <div
          className="absolute block rounded-full transition-all duration-400 ease-in-out"
          style={{
            top: "4.5em",
            left: "18em",
            width: "7em",
            height: "7em",
            backgroundColor: "#fff",
            transform: "rotate(0deg)",
            boxShadow: `
            inset 3em 3em 0 5em #fff,
            0 -5em 0 -2.7em #fff,
            3.5em -3.5em 0 -3em #fff,
            5em 0 0 -2.7em #fff,
            3.5em 3.5em 0 -3em #fff,
            0 5em 0 -2.7em #fff,
            -3.5em 3.5em 0 -3em #fff,
            -5em 0 0 -2.7em #fff,
            -3.5em -3.5em 0 -3em #fff
          `,
          }}
        ></div>
      )}
    </div>
  );
}

export default DarkModeToggle;
