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
      <Card>
        <CardContent>
          <div className="flex w-full flex-col items-center justify-center gap-5">
            <Image
              width={200}
              height={200}
              alt={pokemon.name}
              className="h-auto w-auto object-contain "
              src={pokemon.sprites.other["official-artwork"].front_default}
            />
            <p className="mb-5 text-start text-2xl text-primary dark:text-secondary">
              {fixWordCasing(pokemon.name)}
            </p>
            <div className="flex w-full flex-col-reverse items-start justify-start gap-10 lg:flex-row">
              <div className="flex w-full flex-1 flex-col gap-5">
                <div className="flex gap-3">
                  <p>Height:</p>
                  <p>{pokemon.height} m</p>
                </div>
                <div className="flex gap-3">
                  <p>Weight:</p>
                  <p>{pokemon.weight} kg</p>
                </div>
                {
                  <div>
                    <p>Abilities:</p>
                    <ul className="flex space-x-5">
                      {pokemon.abilities
                        .map(
                          (ability) =>
                            `${fixWordCasing(ability.ability.name)}${
                              ability.is_hidden ? " (Hidden)" : ""
                            }`,
                        )
                        .join(", ")}
                    </ul>
                  </div>
                }
                {
                  <div className="space-y-3">
                    <p>Types:</p>
                    <ul className="flex space-x-5">
                      {pokemon.types.map((item) => (
                        <TypePill key={item.type.name} type={item.type.name} />
                      ))}
                    </ul>
                  </div>
                }
                {
                  <div>
                    <p>{fixWordCasing(pokemon.name)} Stats:</p>
                    <ul className="w-full">
                      {pokemon.stats.map((stat) => (
                        <div
                          key={stat.stat.name}
                          className="flex items-center gap-5 space-y-3"
                        >
                          <div className="flex w-full gap-1">
                            <p>{fixWordCasing(stat.stat.name)}:</p>
                            <p>{stat.base_stat}</p>
                          </div>
                          <Progress value={stat.base_stat} />
                        </div>
                      ))}
                    </ul>
                  </div>
                }
              </div>
              <div className="flex flex-[2] flex-col items-start gap-10">
                <div className="flex flex-col items-start justify-start gap-5">
                  <p className="text-xl text-primary dark:text-secondary">
                    Pokemon Description
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with
                    desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                  </p>
                </div>
                <div className="w-full">
                  <PokemonSpeciesAndEvolution pokemon={pokemon} />
                </div>
              </div>
            </div>
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
