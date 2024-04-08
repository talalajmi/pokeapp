"use client";

// ** React Imports
import React, { useRef } from "react";

// ** Next.js Imports
import Image from "next/image";
import Link from "next/link";

// ** Component Imports
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

// ** Third Party Imports
import Autoplay from "embla-carousel-autoplay";

// ** Custom Hooks and Types
import { getPokemonImageOfficial } from "@/lib/helpers";

// ** Constants
import { routes } from "@/lib/constants";

const PokemonCarousel = () => {
  // ** States
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full max-w-xs md:max-w-full"
    >
      <CarouselContent>
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="
            basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6
          "
          >
            <Link href={routes.pokemon(index + 1)} className="p-1">
              <Card className="card group relative">
                <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-primary p-2 text-white dark:bg-secondary dark:text-primary">
                  #{index + 1}
                </div>
                <CardContent className="flex aspect-square flex-col items-center justify-around gap-5">
                  <Image
                    width={150}
                    height={150}
                    alt={`${index + 1}`}
                    src={getPokemonImageOfficial(index + 1)}
                    className="default-transition h-auto w-auto object-contain group-hover:scale-105 group-active:scale-95"
                  />
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="btn-secondary" />
      <CarouselNext className="btn-secondary" />
    </Carousel>
  );
};

export default PokemonCarousel;
