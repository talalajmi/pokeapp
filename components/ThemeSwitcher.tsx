"use client";

import React from "react";

import { useTheme } from "@/context/ThemeProvider";
import {
  Menubar,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
} from "@/components/ui/menubar";
import { themes } from "@/lib/constants";
import { Icon } from "@iconify/react";

interface ThemeType {
  value: string;
  label: string;
  icon: string;
}

const ThemeSwitcher = () => {
  const { mode, setMode } = useTheme();

  const handleThemeChange = (theme: ThemeType) => {
    setMode(theme.value);

    if (theme.value !== "system") {
      localStorage.theme = theme.value;
    } else {
      localStorage.removeItem("theme");
    }
  };

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "dark" ? (
            <Icon
              width={24}
              height={24}
              className="text-primary dark:text-secondary"
              icon="material-symbols:dark-mode"
            />
          ) : (
            <Icon
              width={24}
              height={24}
              className="text-primary dark:text-secondary"
              icon="material-symbols:light-mode"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="dark:border-dark-400 absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:bg-background">
          {themes.map((theme, index) => (
            <MenubarItem
              key={index}
              onSelect={() => handleThemeChange(theme)}
              className="focus:bg-light-800 dark:focus:bg-dark-400 flex cursor-pointer items-center gap-4 rounded px-2.5 py-2 hover:bg-blue-500/10 dark:hover:bg-yellow-500/20"
            >
              <Icon
                icon={theme.icon}
                width={24}
                height={24}
                className={`${mode === theme.value && "text-primary dark:text-secondary"}`}
              />
              <p
                className={`body-semibold text-light-500 ${mode === theme.value ? "text-primary dark:text-secondary" : "text-black dark:text-white"}`}
              >
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ThemeSwitcher;
