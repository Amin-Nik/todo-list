"use client";
import { useState, useEffect } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    const body = document.body;
    const bodyClass = body.className;
    if (darkMode) {
      const slicedBodyClass = bodyClass.slice(0, bodyClass.indexOf("-dark"));
      body.classList.remove(bodyClass);
      body.classList.add(slicedBodyClass);
      window.localStorage.setItem("themeName", slicedBodyClass);
    } else {
      body.classList.remove(bodyClass);
      body.classList.add(bodyClass + "-dark");
      window.localStorage.setItem("themeName", bodyClass + "-dark");
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const themeName = window.localStorage.getItem("themeName");
    const body = document.body;
    if (themeName) {
      if (themeName.indexOf("-dark") == -1) setDarkMode(false);
      else setDarkMode(true);

      body.classList.remove(body.className);
      body.classList.add(themeName);
    } else {
      body.classList.remove(body.className);
      body.classList.add("theme1");
    }
  }, []);

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer rounded-full transition-all duration-500 ease-in-out"
      style={{
        fontSize: "15%",
        height: "16em",
        width: "30em",
        backgroundColor: darkMode ? "#423966" : "#00B5FF",
      }}
    >
      {darkMode ? (
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
              inset 3em 2.5em 0 0em #ffff,
              0em -7em 0 -4.5em #9D9D9d,
              3em 7em 0 -4.5em #9D9D9d,
              2em 13em 0 -4em #9D9D9d,
              6em 2em 0 -4.1em #9D9D9d,
              8em 8em 0 -4.5em #9D9D9d,
              6em 13em 0 -4.5em #9D9D9d,
              -4em 7em 0 -4.5em #9D9D9d,
              -1em 10em 0 -4.5em #9D9D9d
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
            backgroundColor: "#FFFF00",
            transform: "rotate(0deg)",
            boxShadow: `
            inset 3em 3em 0 5em #FFFF00,
            0 -5em 0 -2.7em #FFFF00,
            3.5em -3.5em 0 -3em #FFFF00,
            5em 0 0 -2.7em #FFFF00,
            3.5em 3.5em 0 -3em #FFFF00,
            0 5em 0 -2.7em #FFFF00,
            -3.5em 3.5em 0 -3em #FFFF00,
            -5em 0 0 -2.7em #FFFF00,
            -3.5em -3.5em 0 -3em #FFFF00
          `,
          }}
        ></div>
      )}
    </div>
  );
}

export default DarkModeToggle;
