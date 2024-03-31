"use client";

import React, { Fragment } from "react";
import { useGetPokemons } from "@/lib/hooks";
import useGetPokemon from "@/lib/hooks/useGetPokemon";
import { PokemonData } from "@/components/PokemonData";
import PokemonDetailsLoadingSkeleton from "@/components/PokemonDetailsLoadingSkeleton";
import useGetSpecies from "@/lib/hooks/useGetSpecies";

interface PokemonDetailsProps {
  params: {
    id: number;
  };
}

const PokemonDetails = ({ params }: PokemonDetailsProps) => {
  // ** Hooks
  const { data: pokemons } = useGetPokemons();
  const { data: pokemon, isLoading } = useGetPokemon(params.id);
  const { data: pokemonSpecies, isLoading: isLoadingPokemonSpecies } =
    useGetSpecies(pokemon?.species.url);

  return (
    <Fragment>
      {!pokemon || isLoading ? (
        <PokemonDetailsLoadingSkeleton />
      ) : (
        <PokemonData
          pokemon={pokemon}
          pokemons={pokemons}
          pokemonSpecies={pokemonSpecies}
          isLoadingPokemonSpecies={isLoadingPokemonSpecies}
        />
      )}
    </Fragment>
  );
};

export default PokemonDetails;
