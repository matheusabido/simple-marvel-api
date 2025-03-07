"use client";

import Link from "next/link";
import { useState } from "react";
import { MdMenu } from "react-icons/md";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between p-4 bg-red-500 text-white flex-col gap-4 sm:flex-row">
      <Link href="/" className="text-3xl font-bold text-center sm:text-start">
        MARVEL
      </Link>
      <nav
        className={`${
          open ? "flex" : "hidden sm:flex"
        } gap-4 items-center text-lg flex-col sm:flex-row`}
      >
        <Link href="/">Home</Link>
        <Link href="/personagens">Personagens</Link>
        <Link href="/comics">Comics</Link>
        <Link href="/escritores">Escritores</Link>
      </nav>
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden absolute cursor-pointer right-4"
      >
        <MdMenu size={32} />
      </button>
    </header>
  );
}
