"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNavbar";
import { navbarLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed z-50 flex w-full items-center justify-between gap-5 border-b border-blue-500/20 bg-white/95 px-8 py-6 backdrop-blur-sm dark:bg-card md:px-16">
      <Link href="/">
        <Image
          width={150}
          height={150}
          alt="pokeapp"
          src="/pokemon.svg"
          className="cursor-pointer object-contain transition duration-300 ease-in-out active:scale-95"
        />
      </Link>

      <div className="hidden gap-5 md:flex">
        {navbarLinks.map((link, index) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link key={index} href={link.route}>
              <p
                className={`
                ${
                  isActive
                    ? "border-b-2 border-primary font-pokemon-solid font-bold text-primary transition duration-300 ease-in-out  dark:text-secondary "
                    : "font-pokemon-hollow text-black transition duration-300 ease-in-out hover:text-primary dark:text-white dark:hover:text-secondary "
                }
                text-xl`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center">
        <ThemeSwitcher />
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
