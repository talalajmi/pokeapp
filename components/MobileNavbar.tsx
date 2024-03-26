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
                isActive ? "text-primary" : "text-black dark:text-white"
              } flex items-center justify-start gap-4 bg-transparent`}
            >
              <p className={`${isActive ? "font-bold text-primary" : ""}`}>
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
          className="text-primary"
          icon="material-symbols:menu"
        />
      </SheetTrigger>
      <SheetContent side="right" className="border-none dark:bg-black">
        <Link href="/">
          <Image src="/pokemon.svg" width={150} height={150} alt="pokeapp" />
        </Link>
        <hr className="mt-5 bg-blue-500/20" />
        <SheetClose asChild>
          <NavContent />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
