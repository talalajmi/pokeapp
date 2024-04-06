"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { getPokemonImageOfficial } from "@/lib/helpers";

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
            <Link href={`/pokemon/${index + 1}`} className="p-1">
              <Card className="group border border-primary bg-transparent transition hover:bg-blue-500/10 dark:border-secondary dark:hover:bg-yellow-500/10">
                <CardContent className="flex aspect-square items-center justify-center">
                  <Image
                    width={150}
                    height={150}
                    alt={`${index + 1}`}
                    src={getPokemonImageOfficial(index + 1)}
                    className="h-auto w-auto object-contain transition duration-300 ease-in-out group-hover:scale-105 group-active:scale-95"
                  />
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="border border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:bg-secondary-dark hover:text-primary active:scale-95" />
      <CarouselNext className="border border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:bg-secondary-dark hover:text-primary active:scale-95" />
    </Carousel>
  );
};

export default PokemonCarousel;
