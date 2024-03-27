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
import useGetPokemonEvolution from "@/lib/hooks/useGetPokemonEvolution";
import PokemonSpeciesAndEvolution from "@/components/PokemonSpeciesAndEvolution";

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
    <div className="flex flex-col items-start justify-start">
      <div className="flex w-full items-center justify-between">
        {pokemon.id > 1 ? (
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/pokemon/${pokemon.id - 1}`}>
                <LongArrowRight
                  flipIcon
                  className="h-24 w-24 fill-primary transition-transform duration-300 ease-in-out hover:-translate-x-5 md:h-32 md:w-32"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className=" text-white">Previous Pokémon</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="w-28" />
        )}
        <p className="font-pokemon-hollow text-2xl tracking-widest text-primary md:text-3xl">
          {`${String(pokemon.id).padStart(String(pokemons?.count).length, "0")} / ${pokemons?.count}`}
        </p>
        <Tooltip>
          <TooltipTrigger>
            <Link href={`/pokemon/${pokemon.id + 1}`}>
              <LongArrowRight className="h-24 w-24 fill-primary transition-transform duration-300 ease-in-out hover:translate-x-5 md:h-32 md:w-32" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p className=" text-black dark:text-white">Next Pokémon</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <Image
          width={200}
          height={200}
          alt={pokemon.name}
          className="h-auto w-auto object-contain "
          src={pokemon.sprites.other["official-artwork"].front_default}
        />
        <p className="mb-5 text-start text-2xl text-primary">
          {fixWordCasing(pokemon.name)}
        </p>
        <div className="flex w-full flex-col-reverse items-start justify-start gap-10 lg:flex-row">
          <div className="flex w-full flex-1 flex-col gap-5">
            <div className="flex gap-3">
              <p className="font-bold">Height:</p>
              <p className="font-pokemon-hollow">{pokemon.height} m</p>
            </div>
            <div className="flex gap-3">
              <p className="font-bold">Weight:</p>
              <p className="font-normal">{pokemon.weight} kg</p>
            </div>
            {
              <div>
                <p className="font-bold">Abilities:</p>
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
                <p className="font-bold">Types:</p>
                <ul className="flex space-x-5">
                  {pokemon.types.map((item) => (
                    <TypePill key={item.type.name} type={item.type.name} />
                  ))}
                </ul>
              </div>
            }
            {
              <div>
                <p className="font-bold">
                  {fixWordCasing(pokemon.name)} Stats:
                </p>
                <ul className="w-full">
                  {pokemon.stats.map((stat) => (
                    <div
                      key={stat.stat.name}
                      className="flex items-center gap-5"
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
              <p className="font-pokemon-hollow text-xl text-primary">
                Pokemon Description
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="w-full">
              <PokemonSpeciesAndEvolution pokemon={pokemon} />
            </div>
          </div>
        </div>
      </div>
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
