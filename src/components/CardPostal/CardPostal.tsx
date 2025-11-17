"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const CardPostal: React.FC = () => {
  const cardRef = useRef<HTMLImageElement | null>(null);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    setIsWide(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateX = ((y - midY) / midY) * -10;
      const rotateY = ((x - midX) / midX) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const reset = () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <>
      {isWide && (
        <Image
          className="rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] w-auto h-auto"
          alt="signup"
          src={"/signup.png"}
          width={350}
          height={350}
          ref={cardRef}
          priority
        />
      )}
    </>
  );
};

export default CardPostal;
