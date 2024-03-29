"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetPokemons } from "@/lib/hooks";
import { Progress } from "@/components/ui/progress";
import useGetPokemon from "@/lib/hooks/useGetPokemon";
import LongArrowRight from "@/components/LongArrowRight";
import LoadingSpinner from "@/components/LoadingSpinner";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { fixWordCasing, getColorByType } from "@/lib/helpers";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import PokemonSpeciesAndEvolution from "@/components/PokemonSpeciesAndEvolution";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface PokemonDetailsProps {
  params: {
    id: string;
  };
}

const PokemonDetails = ({ params }: PokemonDetailsProps) => {
  // ** Hooks
  const { data: pokemons } = useGetPokemons(0);
  const { data: pokemon, isLoading } = useGetPokemon(parseInt(params.id));

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (!pokemon) return <div>Not Found</div>;

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
                  className="hover:bg-secondary-dark rounded-full border border-primary transition duration-300 ease-out hover:scale-110 active:scale-95"
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
                className="hover:bg-secondary-dark rounded-full border border-primary transition duration-300 ease-out hover:scale-110 active:scale-95"
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
        <CardContent className="p-5">
          <div className="grid h-full w-full grid-cols-1 gap-5 xl:grid-cols-2">
            <Image
              width={350}
              height={350}
              alt={pokemon.name}
              src={pokemon.sprites.other["official-artwork"].front_default}
              className="justify-self-center rounded-full border-2 border-primary bg-secondary p-5"
            />
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl text-primary dark:text-secondary">
                {fixWordCasing(pokemon.name)}
              </h1>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <TypePill key={type.type.name} type={type.type.name} />
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <p>Height:</p>
                <p>{pokemon.height}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>Weight:</p>
                <p>{pokemon.weight}</p>
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
              <div className="flex flex-col">
                <p>{fixWordCasing(pokemon.name)} Cries:</p>
                <div className="flex flex-col gap-4 md:flex-row">
                  <Button
                    onClick={listenToLatestCry}
                    className="hover:bg-secondary-dark mt-5 w-full rounded-full border-2 border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:scale-105 active:scale-95"
                  >
                    Cry 1
                  </Button>
                  <Button
                    onClick={listenToLegacyyCry}
                    className="hover:bg-secondary-dark mt-5 w-full rounded-full border-2 border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:scale-105 active:scale-95"
                  >
                    Cry 2
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p>Base Experience: {pokemon.base_experience}</p>
              <p>{fixWordCasing(pokemon.name)} Stats</p>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex items-center gap-2">
                  <p>{fixWordCasing(stat.stat.name)}:</p>
                  <Progress
                    max={255}
                    className="bg-primary-dark dark:bg-secondary-dark outline-non h-2 w-1/2"
                    value={stat.base_stat}
                  />
                </div>
              ))}
            </div>
            <PokemonSpeciesAndEvolution pokemon={pokemon} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonDetails;

const TypePill = ({ type }: { type: string }) => {
  return (
    <div
      className={`rounded-full px-3 py-1 ${getColorByType(type)} text-white`}
    >
      {fixWordCasing(type)}
    </div>
  );
};
