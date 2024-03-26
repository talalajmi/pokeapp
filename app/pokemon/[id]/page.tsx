"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import routes from "@/lib/routes";
import { Button } from "@/components/ui/button";
import useGetPokemon from "@/lib/hooks/useGetPokemon";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fixWordCasing, getColorByType } from "@/lib/helpers";
import useGetPokemonEvolution from "@/lib/hooks/useGetPokemonEvolution";

interface PokemonDetailsProps {
  params: {
    id: string;
  };
}

const PokemonDetails = ({ params }: PokemonDetailsProps) => {
  // ** Hooks
  const { data: pokemon, isLoading } = useGetPokemon(parseInt(params.id));
  const { data: pokemonEvolutions, isLoading: isPokemonEvolutionLoading } =
    useGetPokemonEvolution(parseInt(params.id));

  console.log(pokemonEvolutions);

  if (isLoading)
    return (
      <div className="flex min-h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  if (!pokemon) return <div>Not Found</div>;

  return (
    <div className="flex justify-start items-start flex-col p-8 space-y-5">
      <div className="flex justify-between items-center w-full">
        <Button disabled={pokemon.id === 1}>
          <Link href={routes.pokemon(pokemon.id - 1)}>Back</Link>
        </Button>
        <p>
          {pokemon.id} - {fixWordCasing(pokemon.name)}
        </p>
        <Button>
          <Link href={routes.pokemon(pokemon.id + 1)}>Next</Link>
        </Button>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:space-x-5 space-y-5">
        <div className="flex flex-col items-start space-y-3">
          <Image
            width={200}
            height={200}
            alt={pokemon.name}
            src={pokemon.sprites.other["dream_world"].front_default}
          />
          <div className="space-y-3">
            <div className="flex space-x-5">
              <div className="flex font-bold gap-3">
                Height: <span className="font-normal">{pokemon.height}</span>
              </div>
              <div className="flex font-bold gap-3">
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
                      }`
                  )
                  .join(", ")}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-bold">Types:</p>
              <ul className="flex space-x-5">
                {pokemon.types.map((type) => (
                  <li
                    key={type.type.name}
                    className={`
                      ${getColorByType(type.type.name)}
                      px-4 py-1 rounded-full
                    `}
                  >
                    {fixWordCasing(type.type.name)}
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
          <p className="text-blue-700 font-bold text-3xl">
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
