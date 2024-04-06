import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 bg-card px-8 py-6 md:flex-row md:px-20">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} PokeApp. All rights reserved.
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Made by Talal Al Ajmi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
