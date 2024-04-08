// ** React Imports
import React, { Fragment, useState } from "react";

// ** Next.js Imports
import Image from "next/image";
import Link from "next/link";

// ** Component Imports
import { Card, CardContent } from "./ui/card";

// ** Icon Imports
import { Icon } from "@iconify/react";

// ** Custom Hooks and Types
import { fixWordCasing, getPokemonImageOfficial } from "@/lib/helpers";

// ** Constants
import { routes } from "@/lib/constants";

interface PokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [imgSrc, setImgSrc] = useState(
    getPokemonImageOfficial(parseInt(pokemon.url.split("/")[6])),
  );

  const handleImageError = () => {
    setImgSrc("/images/poke-ball.png");
  };

  return (
    <Fragment>
      <Link href={routes.pokemon(pokemon.url.split("/")[6])}>
        <Card className="card group relative">
          <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-primary p-2 text-white dark:bg-secondary dark:text-primary">
            #{parseInt(pokemon.url.split("/")[6])}
          </div>
          <CardContent className="flex aspect-square flex-col items-center justify-around gap-5">
            <Image
              width={150}
              height={150}
              src={imgSrc}
              onError={handleImageError}
              alt={`${pokemon.name + 1}`}
              className="default-transition h-auto w-auto object-contain group-hover:scale-105 group-active:scale-95"
            />
            <div className="flex w-full flex-col items-center justify-between gap-3">
              <p className="default-transition text-sm dark:text-gray-400 dark:group-hover:text-white sm:text-base">
                {fixWordCasing(pokemon.name)}
              </p>
              <div className="flex items-center gap-2 border-primary text-xs text-primary transition-transform duration-300 ease-in-out group-hover:translate-x-3 dark:text-yellow-400 sm:text-base">
                View Details
                <Icon fontSize={18} icon="akar-icons:arrow-right" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </Fragment>
  );
};

export default PokemonCard;
