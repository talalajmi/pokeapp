"use client";

import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navbarLinks } from "@/lib/constants";
import { Icon } from "@iconify/react";

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
              }tracking-widest text-2xl transition duration-300 ease-in-out`}
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
          <Image src="/pokemon.svg" width={150} height={150} alt="pokeapp" />
        </Link>
        <hr className="dark:bg-secondary-dark mt-5 h-0.5 bg-primary" />
        <SheetClose asChild>
          <NavContent />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
