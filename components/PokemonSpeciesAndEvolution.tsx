import React from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import LongArrowRight from "./LongArrowRight";
import usePokeApi from "@/lib/hooks/usePokeApi";
import { useQuery } from "@tanstack/react-query";
import {
  Pokemon,
  PokemonEvolutionChain,
  GetPokemonSpeciesResponse,
} from "@/lib/types";
import { fixWordCasing } from "@/lib/helpers";

interface PokemonSpeciesAndEvolutionProps {
  pokemon: Pokemon;
}

const PokemonSpeciesAndEvolution = ({
  pokemon,
}: PokemonSpeciesAndEvolutionProps) => {
  // ** Hooks
  const { data: species, isLoading } = usePokeApi<GetPokemonSpeciesResponse>(
    pokemon.species.url,
  );

  // ** Get the evolution chain, this query is dependent on the species query, so we only run it if the species query is successful
  const { data: evolutionChain } = useQuery({
    queryKey: ["GetPokemonEvolution", pokemon.id],
    queryFn: async () =>
      species
        ? await axios
            .get(species.evolution_chain.url)
            .then((res) => res.data as PokemonEvolutionChain)
        : undefined,
    enabled: !!species,
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {
            // ** If the evolution chain is loaded, we can display the evolution chain
            evolutionChain ? (
              <div className="space-y-5">
                <div className="font-pokemon-solid text-lg text-primary dark:text-secondary">
                  {fixWordCasing(pokemon.name)} Evolution Chain:
                </div>
                {evolutionChain.chain.evolves_to.length !== 0 ? (
                  evolutionChain.chain.evolves_to.map((evolution, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-start gap-5 md:flex-row"
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
                    No evolution chain available for{" "}
                    {fixWordCasing(pokemon.name)}
                  </div>
                )}
              </div>
            ) : isLoading ? (
              <div>Loading Evolution Chain...</div>
            ) : (
              <div>Failed to load evolution chain</div>
            )
          }
        </>
      )}
    </div>
  );
};

export default PokemonSpeciesAndEvolution;
