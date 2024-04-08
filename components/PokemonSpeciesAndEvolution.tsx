// ** React Imports
import React from "react";

// ** Component Imports
import PokemonCard from "./PokemonCard";
import { Skeleton } from "./ui/skeleton";
import LongArrowRight from "./LongArrowRight";

// ** Custom Hooks and Types
import usePokeApi from "@/lib/hooks/usePokeApi";
import { useGetPokemonEvolutionChain } from "@/lib/hooks";
import { Pokemon, GetPokemonSpeciesResponse } from "@/lib/types";

// ** Helpers
import { fixWordCasing } from "@/lib/helpers";

interface PokemonSpeciesAndEvolutionProps {
  pokemon: Pokemon;
}

const PokemonSpeciesAndEvolution = ({
  pokemon,
}: PokemonSpeciesAndEvolutionProps) => {
  // ** Hooks
  const { data: species } = usePokeApi<GetPokemonSpeciesResponse>(
    pokemon.species.url,
  );

  // ** Get the evolution chain, this query is dependent on the species query, so we only run it if the species query is successful
  const { data: evolutionChain, isLoading: isLoadingEvolutionChain } =
    useGetPokemonEvolutionChain(species);

  return (
    <div>
      {isLoadingEvolutionChain || !evolutionChain ? (
        <div className="flex w-full flex-col gap-5">
          <Skeleton className="h-6 w-72 bg-gray-200 dark:bg-gray-500" />
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <Skeleton className="h-72 w-72 bg-gray-200 dark:bg-gray-500" />
            <LongArrowRight
              width={150}
              height={150}
              className="h-auto w-auto rotate-90 fill-gray-200 dark:fill-gray-500 md:rotate-0 "
            />
            <Skeleton className="h-72 w-72 bg-gray-200 dark:bg-gray-500" />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-5">
          <div className="font-pokemon-solid text-2xl text-primary dark:text-secondary">
            {fixWordCasing(pokemon.name)} Evolution Chain:
          </div>
          <p>
            {fixWordCasing(pokemon.name)} evolves into{" "}
            {evolutionChain.chain.evolves_to
              .map((evolution) => fixWordCasing(evolution.species.name))
              .join(", ")}
          </p>
          {evolutionChain.chain.evolves_to.length !== 0 ? (
            evolutionChain.chain.evolves_to.map((evolution, index) => (
              <div
                key={index}
                className="flex h-full flex-col items-center justify-start gap-5 md:flex-row"
              >
                <PokemonCard
                  pokemon={{
                    name: evolution.species.name,
                    url: evolution.species.url,
                  }}
                />
                {evolution.evolves_to.map((evolution) => (
                  <div
                    key={evolution.species.name}
                    className="flex flex-col items-center justify-center gap-5 md:flex-row"
                  >
                    <LongArrowRight
                      width={150}
                      height={150}
                      className="h-auto w-auto rotate-90 fill-primary dark:fill-secondary md:rotate-0"
                    />
                    <PokemonCard
                      pokemon={{
                        name: evolution.species.name,
                        url: evolution.species.url,
                      }}
                    />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>
              No evolution chain available for {fixWordCasing(pokemon.name)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonSpeciesAndEvolution;
