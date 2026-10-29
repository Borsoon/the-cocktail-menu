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
    <div className="flex w-full items-center justify-between py-10">
      <Link href={"/"} className="text-2xl">THE COCKTAIL MENU</Link>
      <button className="cursor-pointer" onClick={barrelRoll}>do a barrel roll</button>
    </div>
  );
}