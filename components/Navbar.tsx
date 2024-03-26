"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNavbar";
import { navbarLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed z-10 flex w-full items-center justify-between gap-5 bg-white/85 px-8 py-6 backdrop-blur-sm">
      <Link href="/">
        <Image src="/pokemon.svg" width={150} height={150} alt="pokeapp" />
      </Link>

      <div className="gap-5 sm:hidden md:flex">
        {navbarLinks.map((link, index) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link key={index} href={link.route}>
              <p
                className={`
                ${
                  isActive ? "font-bold text-primary" : "font-normal text-black"
                }
                `}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="md:hidden">
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
