// ** React Imports
import React, { useState } from "react";

// ** Next.js Imports
import Link from "next/link";
import Image from "next/image";

// ** Component Imports
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";
import PokemonEvolution from "./PokemonEvolution";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

// ** Icon Imports
import { Icon } from "@iconify/react";

// ** Custom Hooks and Types
import {
  fixWordCasing,
  getPokemonImageOfficial,
  getPokemonImageDreamWorld,
} from "@/lib/helpers";
import { useGetPokemons } from "@/lib/hooks";
import { Pokemon, GetPokemonSpeciesResponse } from "@/lib/types";

// ** Constants
import { routes } from "@/lib/constants";

interface PokemonDataProps {
  pokemon: Pokemon;
  isLoading: boolean;
  pokemonSpecies: GetPokemonSpeciesResponse;
}

export const PokemonData = (props: PokemonDataProps) => {
  // ** Props
  const { pokemon, isLoading, pokemonSpecies } = props;

  // ** States
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imgSrc, setImgSrc] = useState(getPokemonImageOfficial(pokemon.id));

  // ** Constants
  const fallbackUrls = [getPokemonImageDreamWorld(pokemon.id)];

  const handleImageError = () => {
    if (currentUrlIndex < fallbackUrls.length) {
      setImgSrc(fallbackUrls[currentUrlIndex]);
      setCurrentUrlIndex(currentUrlIndex + 1);
    } else {
      setImgSrc("/images/poke-ball.png");
    }
  };

  const listenToLatestCry = () => {
    const cry = new Audio(pokemon.cries.latest);
    cry.play();
  };

  const listenToLegacyCry = () => {
    const cry = new Audio(pokemon.cries.legacy);
    cry.play();
  };

  return (
    <div className="flex flex-col items-start justify-start gap-5">
      <div className="flex w-full items-center justify-between">
        {pokemon.id > 1 ? (
          <Tooltip>
            <TooltipTrigger>
              <Link href={routes.pokemon(pokemon.id - 1)}>
                <Button className="btn-secondary">
                  <Icon
                    fontSize={24}
                    icon="akar-icons:arrow-left"
                    className="text-primary-dark"
                  />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent className="bg-primary-dark">
              <p className="text-secondary">Previous Pokémon</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="w-28" />
        )}
        <p className="font-pokemon-hollow text-3xl tracking-widest text-primary dark:text-secondary md:text-3xl">
          # {pokemon.id}
        </p>
        <Tooltip>
          <TooltipTrigger>
            <Link href={routes.pokemon(pokemon.id + 1)}>
              <Button className="btn-secondary">
                <Icon
                  fontSize={24}
                  icon="akar-icons:arrow-right"
                  className="text-primary-dark"
                />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent className="bg-primary-dark">
            <p className="text-secondary">Next Pokémon</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-10 p-5">
          <div className="flex flex-col items-center justify-start gap-10">
            <div className="flex w-full flex-col gap-5 xl:flex-row">
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="rounded-full border-2 border-primary bg-secondary p-10">
                  <Image
                    width={300}
                    height={300}
                    src={imgSrc}
                    alt={pokemon.name}
                    onError={handleImageError}
                  />
                </div>
                <h1 className="text-center text-3xl text-primary dark:text-secondary lg:text-start">
                  {fixWordCasing(pokemon.name)}
                </h1>
              </div>
              <div className="flex w-full flex-col gap-10">
                <div className="flex flex-col gap-5">
                  <p className="text-2xl text-primary dark:text-secondary">
                    {fixWordCasing(pokemon.name)} Type:
                  </p>
                  <div className="flex gap-2">
                    {pokemon.types.map((type) => (
                      <TypePill key={type.type.name} type={type.type.name} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-2xl text-primary dark:text-secondary">
                    {fixWordCasing(pokemon.name)} Basic Info:
                  </p>
                  <div className="flex items-center gap-2">
                    <p>Height:</p>
                    <p>{pokemon.height} m</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p>Weight:</p>
                    <p>{pokemon.weight} kg</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p>Abilities:</p>
                    <div className="flex gap-2">
                      {pokemon.abilities.map((ability) => (
                        <div key={ability.ability.name}>
                          {fixWordCasing(ability.ability.name)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p>Moves:</p>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.moves.slice(0, 5).map((move) => (
                        <div key={move.move.name}>
                          {fixWordCasing(move.move.name)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-2xl text-primary dark:text-secondary">
                    {fixWordCasing(pokemon.name)} Cries:{" "}
                    <span className="text-sm text-primary dark:text-secondary">
                      (Does not work on mobile)
                    </span>
                  </p>
                  <div className="flex flex-col gap-4 md:flex-row">
                    <Button
                      onClick={listenToLatestCry}
                      className="btn-secondary w-full"
                    >
                      Latest Cry
                    </Button>
                    <Button
                      onClick={listenToLegacyCry}
                      className="btn-secondary w-full"
                    >
                      Legacy Cry
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="bg-gray-200 dark:bg-yellow-400/10" />
            <div className="flex w-full flex-col gap-10 xl:flex-row">
              <div className="flex w-full flex-col gap-4">
                <p className="text-2xl text-primary dark:text-secondary">
                  {fixWordCasing(pokemon.name)} Stats:
                </p>
                <p>Base Experience: {pokemon.base_experience}</p>
                {pokemon.stats.map((stat) => (
                  <div
                    key={stat.stat.name}
                    className="flex flex-col items-start gap-2"
                  >
                    <div className="flex gap-2">
                      <p>{fixWordCasing(stat.stat.name)}:</p>
                      <p>{stat.base_stat}</p>
                    </div>
                    <Progress
                      max={255}
                      value={stat.base_stat}
                      className="bg-secondary"
                    />
                  </div>
                ))}
              </div>
              <div className="w-full ">
                <PokemonEvolution
                  evolutionId={parseInt(
                    pokemonSpecies.evolution_chain.url.split("/")[6],
                  )}
                />
              </div>
            </div>
          </div>
          <div>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-6 w-[30rem] bg-gray-200" />
                <Skeleton className="h-6 w-full bg-gray-200" />
                <Skeleton className="h-6 w-full bg-gray-200" />
                <Skeleton className="h-6 w-full bg-gray-200" />
              </div>
            ) : (
              <div className="flex">
                {pokemonSpecies.flavor_text_entries.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <Separator className="my-5 bg-gray-200 dark:bg-yellow-400/10" />
                    <h1 className="text-start text-2xl text-primary dark:text-secondary">
                      Information about {fixWordCasing(pokemon.name)}
                    </h1>
                    <div className="flex flex-col gap-2">
                      <p className="leading-relaxed">
                        {showFullDescription
                          ? Array.from(
                              new Set(
                                pokemonSpecies.flavor_text_entries
                                  .filter(
                                    (entry) => entry.language.name === "en",
                                  )
                                  .map((entry) => entry.flavor_text),
                              ),
                            ).join(" ")
                          : Array.from(
                              new Set(
                                pokemonSpecies.flavor_text_entries
                                  .filter(
                                    (entry) => entry.language.name === "en",
                                  )
                                  .map((entry) => entry.flavor_text),
                              ),
                            )
                              .join(" ")
                              .split(" ")
                              .slice(0, 100)
                              .join(" ") + "..."}
                        <Button
                          onClick={() =>
                            setShowFullDescription(!showFullDescription)
                          }
                          className="default-transition ml-2 cursor-pointer rounded-md bg-transparent p-1 text-base text-primary shadow-none hover:bg-blue-400/20 active:scale-95 dark:text-secondary dark:hover:bg-yellow-400/10"
                        >
                          {showFullDescription ? " Show Less" : " Show More"}
                        </Button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TypePill = ({ type }: { type: string }) => {
  const color = {
    normal: "bg-gray-400",
    fighting: "bg-red-500",
    flying: "bg-blue-500",
    poison: "bg-purple-500",
    ground: "bg-yellow-500",
    rock: "bg-yellow-800",
    bug: "bg-green-500",
    ghost: "bg-indigo-500",
    steel: "bg-gray-500",
    fire: "bg-red-600",
    water: "bg-blue-600",
    grass: "bg-green-600",
    electric: "bg-yellow-600",
    psychic: "bg-pink-500",
    ice: "bg-blue-300",
    dragon: "bg-blue-800",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
  };

  return (
    <div
      className={`rounded-full px-3 py-1 ${color[type as keyof typeof color]} text-white`}
    >
      {fixWordCasing(type)}
    </div>
  );
};
