"use client";

import {
  Pokemon,
  PokemonEvolutionChain,
  GetPokemonSpeciesResponse,
} from "@/lib/types";
import { pokemonEndpoints } from "@/lib/services";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import PokemonCard from "@/components/PokemonCard";
import LongArrowRight from "@/components/LongArrowRight";
import { fixWordCasing } from "@/lib/helpers";
import { Skeleton } from "@/components/ui/skeleton";

interface PokemonDetailsProps {
  params: {
    id: number;
  };
}

const TestPage = (props: PokemonDetailsProps) => {
  // ** Props
  const {
    params: { id },
  } = props;

  const fetchPokemonData = async () => {
    try {
      const pokemonRes: AxiosResponse<Pokemon> = await axios.get(
        pokemonEndpoints.getPokemon(id),
      );
      const speciesRes: AxiosResponse<GetPokemonSpeciesResponse> =
        await axios.get(pokemonRes.data.species.url);

      let evolvesFromSpeciesData = null;
      if (speciesRes.data.evolves_from_species) {
        try {
          const evolvesFromSpeciesRes: AxiosResponse<GetPokemonSpeciesResponse> =
            await axios.get(speciesRes.data.evolves_from_species.url);
          evolvesFromSpeciesData = evolvesFromSpeciesRes.data;
        } catch (error) {
          console.error("Error fetching evolves from species data: ", error);
        }
      }

      let evolutionChainData = null;
      if (speciesRes.data.evolution_chain) {
        try {
          const evolutionChainRes: AxiosResponse<PokemonEvolutionChain> =
            await axios.get(speciesRes.data.evolution_chain.url);
          evolutionChainData = evolutionChainRes.data;
        } catch (error) {
          console.error("Error fetching evolution chain data: ", error);
        }
      }

      return {
        pokemon: pokemonRes.data,
        species: speciesRes.data,
        evolutionChain: evolutionChainData,
        evolvesFromSpecies: evolvesFromSpeciesData,
      };
    } catch (error) {
      console.error("Error fetching pokemon or species data: ", error);
    }
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["pokemonData"],
    queryFn: fetchPokemonData,
  });

  return (
    <div>
      {isLoading ? (
        <div className="mb-5 flex flex-col gap-5">
          <Skeleton className="h-10 w-60 bg-gray-200 dark:bg-gray-500" />
          <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500 md:w-96" />
          <div className="flex flex-col items-center gap-5 lg:flex-row">
            <Skeleton className="h-64 w-60 bg-gray-200 dark:bg-gray-500" />
            <LongArrowRight
              width={150}
              height={150}
              className="h-auto w-auto rotate-90 fill-gray-200 dark:fill-gray-500 lg:rotate-0"
            />
            <Skeleton className="h-64 w-60 bg-gray-200 dark:bg-gray-500" />
            <LongArrowRight
              width={150}
              height={150}
              className="h-auto w-auto rotate-90 fill-gray-200 dark:fill-gray-500 lg:rotate-0"
            />
            <Skeleton className="h-64 w-60 bg-gray-200 dark:bg-gray-500" />
          </div>
        </div>
      ) : data ? (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-primary dark:text-secondary">
            {fixWordCasing(data.pokemon.name)} Evolution Chain:
          </h1>
          {data.evolvesFromSpecies ? (
            <div className="flex flex-col gap-5">
              <div>
                <div>
                  {`#${data.pokemon.id} `}
                  <span className="text-primary dark:text-secondary">
                    {fixWordCasing(data.pokemon.name)}
                  </span>
                  {` evolves from `}
                  <span className="text-primary dark:text-secondary">
                    {fixWordCasing(data.evolvesFromSpecies.name)}
                  </span>
                  {data.evolutionChain ? (
                    data.evolutionChain.chain.evolves_to.map(
                      (evolution, index) => (
                        <span key={index}>
                          {`, then evolves into `}
                          <span className="text-primary dark:text-secondary">
                            {fixWordCasing(evolution.species.name)}
                          </span>
                          {evolution.evolves_to.length > 0 ? (
                            evolution.evolves_to.map((nextEvolution, index) => (
                              <span key={index}>
                                {index !== evolution.evolves_to.length - 1
                                  ? `, then into `
                                  : `, and finally into `}
                                <span className="text-primary dark:text-secondary">
                                  {fixWordCasing(nextEvolution.species.name)}
                                </span>
                                {index !== evolution.evolves_to.length - 1
                                  ? ""
                                  : "."}
                              </span>
                            ))
                          ) : (
                            <span>
                              . This is the final form of this Pokemon.
                            </span>
                          )}
                        </span>
                      ),
                    )
                  ) : (
                    <div>
                      This Pokemon does not evolve into any other Pokemon.
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center gap-5 lg:flex-row">
                {data.evolvesFromSpecies ? (
                  <div className="flex flex-col items-center gap-5 lg:flex-row">
                    <PokemonCard
                      pokemon={{
                        name: data.evolvesFromSpecies.name,
                        url: pokemonEndpoints.getPokemon(
                          data.evolvesFromSpecies.id,
                        ),
                      }}
                    />
                    <LongArrowRight
                      width={150}
                      height={150}
                      className="rotate-90 fill-primary dark:fill-secondary lg:rotate-0"
                    />
                  </div>
                ) : null}
                <PokemonCard
                  pokemon={{
                    name: fixWordCasing(data.pokemon.name),
                    url: data.pokemon.species.url,
                  }}
                />
                {data.evolutionChain ? (
                  data.evolutionChain.chain.evolves_to.map((evolution, i) => (
                    <div className="flex items-center" key={i}>
                      {evolution.evolves_to.length !== 0
                        ? evolution.evolves_to.map((evolution) => (
                            <div
                              className="flex flex-col items-center gap-5 lg:flex-row"
                              key={evolution.species.name}
                            >
                              <LongArrowRight
                                width={150}
                                height={150}
                                className="rotate-90 fill-primary dark:fill-secondary lg:rotate-0"
                              />
                              <PokemonCard
                                pokemon={{
                                  name: evolution.species.name,
                                  url: evolution.species.url,
                                }}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  ))
                ) : (
                  <div>
                    {fixWordCasing(data.pokemon.name)} does not evolve into any
                    other Pokemon
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div>
                {`#${data.pokemon.id} `}
                <span className="text-primary dark:text-secondary">
                  {fixWordCasing(data.pokemon.name)}
                </span>
                {` is the first form of this Pokemon.`}

                {data.evolutionChain ? (
                  data.evolutionChain.chain.evolves_to.map(
                    (evolution, index) => (
                      <span key={index}>
                        {`, then it evolves into `}
                        <span className="text-primary dark:text-secondary">
                          {fixWordCasing(evolution.species.name)}
                        </span>
                        {evolution.evolves_to.length > 0 ? (
                          evolution.evolves_to.map((nextEvolution, index) => (
                            <span key={index}>
                              {index !== evolution.evolves_to.length - 1
                                ? `, then into `
                                : `, and finally into `}
                              <span className="text-primary dark:text-secondary">
                                {fixWordCasing(nextEvolution.species.name)}
                              </span>
                              {index !== evolution.evolves_to.length - 1
                                ? ""
                                : "."}
                            </span>
                          ))
                        ) : (
                          <span>. This is the final form of this Pokemon.</span>
                        )}
                      </span>
                    ),
                  )
                ) : (
                  <div>
                    This Pokemon does not evolve into any other Pokemon.
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-5">
                <PokemonCard
                  pokemon={{
                    name: fixWordCasing(data.pokemon.name),
                    url: pokemonEndpoints.getPokemon(data.pokemon.id),
                  }}
                />
                {data.evolutionChain ? (
                  data.evolutionChain.chain.evolves_to.map((evolution, i) => (
                    <div className="flex items-center gap-5" key={i}>
                      <LongArrowRight
                        width={150}
                        height={150}
                        className="fill-primary dark:fill-secondary"
                      />
                      <div className="flex items-center" key={i}>
                        <PokemonCard
                          pokemon={{
                            name: evolution.species.name,
                            url: evolution.species.url,
                          }}
                        />
                      </div>
                      {evolution.evolves_to.length !== 0
                        ? evolution.evolves_to.map((evolution) => (
                            <div
                              className="flex items-center"
                              key={evolution.species.name}
                            >
                              <LongArrowRight
                                width={150}
                                height={150}
                                className="fill-primary dark:fill-secondary"
                              />
                              <PokemonCard
                                pokemon={{
                                  name: evolution.species.name,
                                  url: evolution.species.url,
                                }}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  ))
                ) : (
                  <div>
                    {fixWordCasing(data.pokemon.name)} does not evolve into any
                    other Pokemon
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        "Error"
      )}{" "}
    </div>
  );
};

export default TestPage;
