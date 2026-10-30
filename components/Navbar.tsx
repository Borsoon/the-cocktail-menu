"use client";

import Link from "next/link";

export default function Navbar() {
  function barrelRoll() {
    document.body.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(360deg)" },
      ],
      {
        duration: 3000,
        easing: "ease-in-out",
      }
    );
  }

  return (
    <div className="flex flex-row w-full items-center justify-between gap-3 py-6 sm:py-10">
      <Link href={"/"} className="text-sm whitespace-nowrap sm:text-2xl">THE COCKTAIL MENU</Link>
      <button className="min-h-11 text-xs whitespace-nowrap cursor-pointer sm:text-base" onClick={barrelRoll}>do a barrel roll</button>
    </div>
  );
}