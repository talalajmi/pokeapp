"use client";

// ** React Imports
import Image from "next/image";
import React, { useState } from "react";

// ** Icon Imports
import { Icon } from "@iconify/react";

// ** Component Imports
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PokemonCard from "@/components/PokemonCard";
import PokemonFilters from "@/components/PokemonFilters";
import { SearchPokemons } from "@/components/SearchPokemons";
import PokemonCardLoadingSkeleton from "@/components/PokemonCardLoadingSkeleton";

// ** Custom Hooks and Types
import usePokeApi from "@/lib/hooks/usePokeApi";
import { GetPokemonsResponse, Pokemon } from "@/lib/types";

// ** Endpoint Imports
import pokemonEndpoints, { baseUrl } from "@/lib/services/api";
import { NamedAPIResource } from "@/lib/types/PokemonSepcies";

const Pokedex = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearched, setIsSearched] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState<NamedAPIResource[]>(
    [],
  );
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);
  const [isLoadingSearchedPokemon, setIsLoadingSearchedPokemon] =
    useState(false);
  const [isLoadingFilteredPokemons, setIsLoadingFilteredPokemons] =
    useState(false);

  const [getPokemonsUrl, setGetPokemonsUrl] = useState(
    pokemonEndpoints.getPokemons,
  );

  // ** Hooks
  const { data: pokemons, isLoading } =
    usePokeApi<GetPokemonsResponse>(getPokemonsUrl);

  // ** Contants
  const itemsPerPage = 20;

  const renderPokemons = (pokemons: GetPokemonsResponse) => {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {pokemons.results.map((pokemon, index) => (
            <div
              key={pokemon.name}
              className="animate-fade-in-left"
              style={{
                animationDelay: `${index * 50}ms`,
                opacity: index === 0 ? 1 : 0,
              }}
            >
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-start gap-5 lg:justify-between xl:flex-row">
          <div className="group flex items-center justify-start gap-5 rounded-full border-[3px] border-black bg-red-500 px-2 py-1 text-white">
            <Image
              width={30}
              height={30}
              alt="pokeball"
              src="/images/poke-ball.png"
              className="h-auto w-auto object-contain group-hover:animate-spin"
            />
            <p>Showing 20 of {pokemons.count} Pokémons</p>
          </div>
          <div className="flex items-center gap-5">
            <Button
              className="btn-secondary w-full xl:w-fit"
              disabled={pokemons.previous === null}
              onClick={() =>
                pokemons.previous && setGetPokemonsUrl(pokemons.previous)
              }
            >
              <Icon
                fontSize={24}
                icon="akar-icons:arrow-left"
                className="default-transition text-primary"
              />
            </Button>

            <Button
              className="btn-secondary w-full xl:w-fit"
              disabled={pokemons.next === null}
              onClick={() => pokemons.next && setGetPokemonsUrl(pokemons.next)}
            >
              <Icon
                fontSize={24}
                icon="akar-icons:arrow-right"
                className="default-transition text-primary"
              />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderFilteredPokemons = (filteredPokemons: NamedAPIResource[]) => {
    const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
    let currentPageAdjusted = currentPage;
    if (currentPage > totalPages) {
      currentPageAdjusted = totalPages;
    }
    const startIndex = (currentPageAdjusted - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPokemons = filteredPokemons.slice(startIndex, endIndex);

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {currentPokemons.map((pokemon, index) => (
            <div
              key={pokemon.name}
              className="animate-fade-in-left"
              style={{
                animationDelay: `${index * 50}ms`,
                opacity: index === 0 ? 1 : 0,
              }}
            >
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-start gap-5 lg:flex-row lg:justify-between">
          <div
            className={`group flex items-center justify-between gap-5 rounded-full border-[3px] border-black bg-red-500 px-2 py-1 text-white`}
          >
            <Image
              width={30}
              height={30}
              alt="pokeball"
              src="/images/poke-ball.png"
              className="h-auto w-auto object-contain group-hover:animate-spin"
            />
            <p>
              Showing{" "}
              {filteredPokemons.length > itemsPerPage
                ? itemsPerPage
                : filteredPokemons.length}{" "}
              Pokémons of {filteredPokemons.length} Pokémons
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="btn-secondary w-full xl:w-fit"
            >
              <Icon
                fontSize={24}
                icon="akar-icons:arrow-left"
                className="default-transition text-primary"
              />
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn-secondary w-full xl:w-fit"
            >
              <Icon
                fontSize={24}
                icon="akar-icons:arrow-right"
                className="default-transition text-primary"
              />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-5 flex w-full flex-col items-center space-y-5">
      <h1 className="text-3xl text-primary dark:text-secondary sm:text-4xl">
        Pokédex
      </h1>
      <SearchPokemons
        isSearched={isSearched}
        setIsSearched={setIsSearched}
        setSearchedPokemon={setSearchedPokemon}
        setIsLoadingSearchedPokemon={setIsLoadingSearchedPokemon}
      />
      <div className="flex w-full flex-col justify-start gap-5 xl:relative xl:flex-row">
        <PokemonFilters
          setIsFiltered={setIsFiltered}
          setFilteredPokemons={setFilteredPokemons}
          setIsLoadingFilteredPokemons={setIsLoadingFilteredPokemons}
        />
        <div className="w-full flex-[3] flex-col items-start space-y-5 lg:flex-[5]">
          {isLoading ||
          !pokemons ||
          isLoadingFilteredPokemons ||
          isLoadingSearchedPokemon ? (
            <PokemCardsLoadingSkeleton />
          ) : isFiltered && filteredPokemons.length !== 0 ? (
            renderFilteredPokemons(filteredPokemons)
          ) : isFiltered && filteredPokemons.length === 0 ? (
            <Card className="flex h-96 w-full flex-col items-center justify-center gap-5">
              <Image
                width={100}
                height={100}
                alt="pokeball"
                src="/images/poke-ball.png"
                className="h-auto w-auto object-contain"
              />
              <p className="text-center text-2xl text-primary dark:text-secondary">
                No Pokémons found for the selected filters
              </p>
            </Card>
          ) : isSearched ? (
            searchedPokemon ? (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  <div className="animate-fade-in-left">
                    <PokemonCard
                      pokemon={{
                        name: searchedPokemon.name,
                        url: `${baseUrl}pokemon/${searchedPokemon.id.toString()}`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-start gap-5 lg:justify-between">
                  <div className="group flex w-fit items-center justify-start gap-5 rounded-full border-[3px] border-black bg-red-500 px-2 py-1 text-white">
                    <Image
                      width={30}
                      height={30}
                      alt="pokeball"
                      src="/images/poke-ball.png"
                      className="h-auto w-auto object-contain group-hover:animate-spin"
                    />
                    <p>Showing 1 of 1 Pokémon</p>
                  </div>
                </div>
              </div>
            ) : (
              <Card className="flex h-96 w-full flex-col items-center justify-center gap-5">
                <Image
                  width={100}
                  height={100}
                  alt="pokeball"
                  src="/images/poke-ball.png"
                  className="h-auto w-auto object-contain"
                />
                <p className="text-center text-2xl text-primary dark:text-secondary">
                  No Pokémons found
                </p>
              </Card>
            )
          ) : !isFiltered && pokemons ? (
            renderPokemons(pokemons)
          ) : (
            <Card className="flex h-96 w-full flex-col items-center justify-center gap-5">
              <Image
                width={100}
                height={100}
                alt="pokeball"
                src="/images/poke-ball.png"
                className="h-auto w-auto object-contain"
              />
              <p className="text-center text-2xl text-primary dark:text-secondary">
                No Pokémons found
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pokedex;

const PokemCardsLoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <PokemonCardLoadingSkeleton key={index} />
        ))}
      </div>
      <div className="flex flex-col justify-start gap-5 lg:justify-between xl:flex-row">
        <div className="group flex items-center justify-start gap-5 rounded-full border-[3px] border-black bg-red-500 px-2 py-1 text-white">
          <Image
            width={30}
            height={30}
            alt="pokeball"
            src="/images/poke-ball.png"
            className="h-auto w-auto object-contain group-hover:animate-spin"
          />
          <p>Loading Pokémons...</p>
        </div>
        <div className="flex items-center gap-5">
          <Button className="default-transition w-full rounded-full border border-primary bg-secondary hover:bg-secondary-dark">
            <Icon
              fontSize={24}
              icon="akar-icons:arrow-left"
              className="default-transition text-primary"
            />
          </Button>

          <Button className="default-transition w-full rounded-full border border-primary bg-secondary hover:bg-secondary-dark">
            <Icon
              fontSize={24}
              icon="akar-icons:arrow-right"
              className="default-transition text-primary"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
