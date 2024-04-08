"use client";

// ** React Imports
import React from "react";

// ** Next.js Imports
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ** Component Imports
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

// ** Icon Imports
import { Icon } from "@iconify/react";

// ** Constants
import { navbarLinks } from "@/lib/constants";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {navbarLinks.map((link, index) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        return (
          <SheetClose asChild key={index}>
            <Link
              href={link.route}
              className={`${
                isActive
                  ? "w-fit border-b-2 border-primary font-pokemon-solid text-primary dark:border-secondary"
                  : "font-pokemon-hollow text-black dark:text-white dark:hover:text-primary "
              }tracking-widest default-transition text-2xl`}
            >
              <p
                className={`${isActive ? "text-primary dark:text-secondary" : "font-pokemon-hollow"}`}
              >
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Icon
          fontSize={28}
          icon="material-symbols:menu"
          className="text-primary dark:text-secondary"
        />
      </SheetTrigger>
      <SheetContent side="right">
        <Link href="/">
          <Image
            src="/pokemon.svg"
            width={150}
            height={150}
            alt="pokeapp"
            priority
          />
        </Link>
        <hr className="mt-5 h-0.5 bg-primary dark:bg-secondary-dark" />
        <SheetClose asChild>
          <NavContent />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
