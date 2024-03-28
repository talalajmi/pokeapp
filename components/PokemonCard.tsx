import { fixWordCasing, getPokemonImage } from "@/lib/helpers";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface PokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Link href={`/pokemon/${pokemon.url.split("/")[6]}`}>
      <Card className="group relative transition duration-300 ease-in-out hover:border-primary hover:bg-blue-500/20 dark:hover:border-yellow-400 dark:hover:bg-yellow-400/20">
        <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-primary p-2 text-white dark:bg-secondary dark:text-primary">
          #{parseInt(pokemon.url.split("/")[6])}
        </div>
        <CardContent className="flex aspect-square flex-col items-center justify-around gap-5">
          <Image
            width={150}
            height={150}
            alt={`${pokemon.name + 1}`}
            src={getPokemonImage(parseInt(pokemon.url.split("/")[6]))}
            className="h-auto w-auto object-contain transition duration-300 ease-in-out group-hover:scale-110 group-active:scale-95"
          />
          <div className="flex w-full flex-col items-center justify-between gap-3 lg:flex-row">
            <p className=" transition duration-300 ease-in-out dark:text-gray-400 dark:group-hover:text-white">
              {fixWordCasing(pokemon.name)}
            </p>
            <div className="flex items-center gap-2 border-primary text-sm text-primary transition-transform duration-300 ease-in-out group-hover:translate-x-3 dark:text-yellow-400">
              View Details
              <Icon fontSize={18} icon="akar-icons:arrow-right" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PokemonCard;
