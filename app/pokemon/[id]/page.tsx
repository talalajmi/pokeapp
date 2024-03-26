"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetPokemons } from "@/lib/hooks";
import useGetPokemon from "@/lib/hooks/useGetPokemon";
import LongArrowRight from "@/components/LongArrowRight";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fixWordCasing, getColorByType } from "@/lib/helpers";
import useGetPokemonEvolution from "@/lib/hooks/useGetPokemonEvolution";
import { navbarLinks } from "@/lib/constants";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

interface PokemonDetailsProps {
  params: {
    id: string;
  };
}

const PokemonDetails = ({ params }: PokemonDetailsProps) => {
  // ** Hooks
  const { data: pokemons } = useGetPokemons();
  const { data: pokemon, isLoading } = useGetPokemon(parseInt(params.id));
  const { data: pokemonEvolutions, isLoading: isPokemonEvolutionLoading } =
    useGetPokemonEvolution(parseInt(params.id));

  console.log(pokemonEvolutions);

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (!pokemon) return <div>Not Found</div>;

  return (
    <div className="flex flex-col items-start justify-start space-y-5">
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
        <p className="font-pokemon-hollow text-2xl tracking-widest text-blue-700 md:text-3xl">
          {String(pokemon.id).padStart(String(pokemons?.count).length, "0")} /{" "}
          {pokemons?.count}
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
      <div className="flex w-full flex-col items-start justify-between space-y-5 md:flex-row md:space-x-5">
        <div className="flex flex-col items-start space-y-3">
          <div className="flex justify-center">
            <Image
              width={200}
              height={200}
              alt={pokemon.name}
              className="h-auto w-auto object-contain "
              src={pokemon.sprites.other["official-artwork"].front_default}
            />
          </div>
          <div className="space-y-3">
            <div className="flex space-x-5">
              <div className="flex gap-3 font-bold">
                Height: <span className="font-normal">{pokemon.height}</span>
              </div>
              <div className="flex gap-3 font-bold">
                Weight:
                <span className="font-normal">{pokemon.weight}</span>
              </div>
            </div>

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

            <div className="space-y-3">
              <p className="font-bold">Types:</p>
              <ul className="flex space-x-5">
                {pokemon.types.map((item) => (
                  <li
                    key={item.type.name}
                    className={`
                      ${getColorByType(item.type.name)}
                      rounded-full px-4 py-1
                      
                    `}
                  >
                    {fixWordCasing(item.type.name)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="font-bold">{fixWordCasing(pokemon.name)} Stats:</p>
              <ul>
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {fixWordCasing(stat.stat.name)}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className="font-pokemon-solid text-3xl font-bold tracking-widest text-blue-700">
            {fixWordCasing(pokemon.name)}
          </p>
          Evolutionary Line:
          {isPokemonEvolutionLoading ? (
            <LoadingSpinner />
          ) : (
            <ul className="flex space-x-5">
              {pokemonEvolutions?.chain.evolves_to.map((evolution) => (
                <li key={evolution.species.name}>
                  {fixWordCasing(evolution.species.name)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
