"use client";

// ** React Imports
import React, { useEffect, useState } from "react";

// ** Component Imports
import { Button } from "./ui/button";

// ** Icon Imports
import { Icon } from "@iconify/react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // ** Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // ** Set the top cordinate to 0
  // ** make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        variant="secondary"
        onClick={scrollToTop}
        className={`btn-secondary transform px-2 py-5 ${isVisible ? "scale-100" : "scale-0"}`}
      >
        <Icon
          fontSize={24}
          icon="akar-icons:arrow-up"
          className=" text-primary"
        />
      </Button>
    </div>
  );
};

export default ScrollToTop;
