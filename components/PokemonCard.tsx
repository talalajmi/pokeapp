import { getPokemonImage } from "@/lib/helpers";
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
      <Card className="group border-transparent transition duration-300 ease-in-out hover:border-primary">
        <CardContent className="flex aspect-square flex-col items-center justify-center gap-5">
          <Image
            width={150}
            height={150}
            alt={`${pokemon.name + 1}`}
            className="h-auto w-auto object-contain"
            src={getPokemonImage(parseInt(pokemon.url.split("/")[6]))}
          />
          <div className="flex w-full items-center justify-between">
            <p className=" dark:text-gray-400">
              {" "}
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </p>
            <div className="flex items-center gap-2 border-primary text-sm text-primary transition-transform duration-300 ease-in-out group-hover:translate-x-3">
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
