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
import { getPokemonImage } from "@/lib/helpers";

const PokemonCarousel = () => {
  // ** States
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full max-w-xs md:max-w-2xl lg:max-w-3xl  xl:max-w-4xl 2xl:max-w-5xl"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/3">
            <Link href={`/pokemon/${index + 1}`} className="p-1">
              <Card className="w-72">
                <CardContent className="flex aspect-square items-center justify-center">
                  <Image
                    width={150}
                    height={150}
                    alt={`${index + 1}`}
                    src={getPokemonImage(index + 1)}
                    className="h-auto w-auto object-contain"
                  />
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default PokemonCarousel;
