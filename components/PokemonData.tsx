import {
  fixWordCasing,
  getPokemonImageDreamWorld,
  getPokemonImageOfficial,
} from "@/lib/helpers";
import { Separator } from "@radix-ui/react-menubar";
import { Progress } from "@radix-ui/react-progress";
import { Icon } from "@iconify/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import Link from "next/link";
import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import PokemonSpeciesAndEvolution from "./PokemonSpeciesAndEvolution";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  GetPokemonSpeciesResponse,
  GetPokemonsResponse,
  Pokemon,
} from "@/lib/types";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

interface PokemonDataProps {
  pokemon: Pokemon;
  isLoadingPokemonSpecies: boolean;
  pokemons: GetPokemonsResponse | undefined;
  pokemonSpecies: GetPokemonSpeciesResponse | undefined;
}

export const PokemonData = (props: PokemonDataProps) => {
  // ** Props
  const { pokemon, pokemons, isLoadingPokemonSpecies, pokemonSpecies } = props;

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

  const listenToLegacyyCry = () => {
    const cry = new Audio(pokemon.cries.legacy);
    cry.play();
  };

  return (
    <div className="flex flex-col items-start justify-start gap-5">
      <div className="flex w-full items-center justify-between">
        {pokemon.id > 1 ? (
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/pokemon/${pokemon.id - 1}`}>
                <Button
                  variant="secondary"
                  className="rounded-full border border-primary transition duration-300 ease-out hover:bg-secondary-dark  active:scale-95"
                >
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
        <p className="font-pokemon-hollow text-2xl tracking-widest text-primary dark:text-secondary md:text-3xl">
          {`${String(pokemon.id).padStart(String(pokemons?.count).length, "0")} / ${pokemons?.count}`}
        </p>
        <Tooltip>
          <TooltipTrigger>
            <Link href={`/pokemon/${pokemon.id + 1}`}>
              <Button
                variant="secondary"
                className="rounded-full border border-primary transition duration-300 ease-out hover:bg-secondary-dark  active:scale-95"
              >
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
          <div className="grid h-full w-full grid-cols-1 gap-10 xl:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-4">
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
            <div className="flex flex-col gap-10">
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
                <div className="flex items-center gap-2">
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
              <div className="flex flex-col">
                <p className="text-2xl text-primary dark:text-secondary">
                  {fixWordCasing(pokemon.name)} Cries:
                </p>
                <div className="flex flex-col gap-4 md:flex-row">
                  <Button
                    onClick={listenToLatestCry}
                    className="mt-5 w-full rounded-full border-2 border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95"
                  >
                    Latest Cry
                  </Button>
                  <Button
                    onClick={listenToLegacyyCry}
                    className="mt-5 w-full rounded-full border-2 border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95"
                  >
                    Legacy Cry
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-2xl text-primary dark:text-secondary">
                {fixWordCasing(pokemon.name)} Stats:
              </p>
              <p>Base Experience: {pokemon.base_experience}</p>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex items-center gap-2">
                  <p>{fixWordCasing(stat.stat.name)}:</p>
                  <Progress
                    max={255}
                    className="outline-non h-2 w-1/2 bg-primary-dark dark:bg-secondary-dark"
                    value={stat.base_stat}
                  />
                </div>
              ))}
            </div>
            <PokemonSpeciesAndEvolution pokemon={pokemon} />
          </div>
          <Separator className="dark:bg-yellow-400/10" />
          <div>
            {isLoadingPokemonSpecies || !pokemonSpecies ? (
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
                    <h1 className="text-start text-2xl text-primary dark:text-secondary">
                      Information about {fixWordCasing(pokemon.name)}
                    </h1>
                    <div className="flex flex-col gap-2">
                      <p className="text-justify leading-relaxed">
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
                              .substring(0, 1000) + "..."}
                        <span
                          onClick={() =>
                            setShowFullDescription(!showFullDescription)
                          }
                          className="ml-2 cursor-pointer rounded-md p-1 text-primary transition duration-300 ease-in-out hover:bg-blue-400/20 dark:text-secondary dark:hover:bg-yellow-400/10"
                        >
                          {showFullDescription ? " Show Less" : " Show More"}
                        </span>
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
