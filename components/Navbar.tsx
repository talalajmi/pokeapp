"use client";

// ** React Imports
import React from "react";

// ** Next.js Imports
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ** Component Imports
import MobileNav from "./MobileNavbar";
import ThemeSwitcher from "./ThemeSwitcher";

// ** Constants
import { navbarLinks } from "@/lib/constants";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed z-50 flex w-full items-center justify-between gap-5 border-b border-blue-500/20 bg-white/95 px-8 py-6 backdrop-blur-sm dark:bg-card md:px-20">
      <Link href="/">
        <Image
          width={150}
          height={150}
          alt="pokeapp"
          src="/pokemon.svg"
          className="default-transition cursor-pointer object-contain active:scale-95"
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
                    ? "default-transition border-b-2 border-primary font-pokemon-solid font-bold text-primary  dark:text-secondary "
                    : "default-transition font-pokemon-hollow text-black hover:text-primary dark:text-white dark:hover:text-secondary "
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
