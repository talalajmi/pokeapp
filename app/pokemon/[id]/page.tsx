"use client";

import React, { Fragment } from "react";
import { PokemonData } from "@/components/PokemonData";
import PokemonDetailsLoadingSkeleton from "@/components/PokemonDetailsLoadingSkeleton";
import { PokemonService } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";

interface PokemonDetailsProps {
  params: {
    id: string;
  };
}

const fetchData = async (pokemonId: string) => {
  const pokemonService = new PokemonService();
  const pokemonData = await pokemonService.getPokemon(pokemonId);
  if (!pokemonData) return;
  const pokemonSpecies = await pokemonService.getPokemonSpecies(
    pokemonData.species.url.split("/")[6],
  );
  if (!pokemonSpecies) return;
  const pokemonEvolution = await pokemonService.getPokemonEvolution(
    pokemonSpecies.evolution_chain.url.split("/")[6],
  );
  if (!pokemonEvolution) return;

  return {
    pokemonData,
    pokemonSpecies,
    pokemonEvolution,
  };
};

const PokemonDetails = ({ params }: PokemonDetailsProps) => {
  // ** Hooks
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ["pokemon", params.id],
    queryFn: () => fetchData(params.id),
  });

  return (
    <Fragment>
      {!pokemon || isLoading ? (
        <PokemonDetailsLoadingSkeleton />
      ) : (
        <PokemonData
          isLoading={isLoading}
          pokemon={pokemon.pokemonData}
          pokemonSpecies={pokemon.pokemonSpecies}
        />
      )}
    </Fragment>
  );
};

export default PokemonDetails;
