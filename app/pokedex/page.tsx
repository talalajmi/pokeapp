"use client";

import {
  GetAbilitiesResponse,
  GetAbilityResponse,
  GetPokemonsResponse,
  GetTypeResponse,
  GetTypesResponse,
} from "@/lib/types";
import { z } from "zod";
import Image from "next/image";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import axios, { AxiosResponse } from "axios";
import { Input } from "@/components/ui/input";
import { fixWordCasing } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import PokemonCard from "@/components/PokemonCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import PokemonCardLoadingSkeleton from "@/components/PokemonCardLoadingSkeleton";
import usePokeApi from "@/lib/hooks/usePokeApi";
import pokemonEndpoints from "@/lib/services/api";
import { AbilitiesCombobox } from "@/components/AbilitiesCombobox";

interface FormValues {
  type: string | undefined;
  ability: string | undefined;
}

const pokemonfilterSchema = z.object({
  type: z.string().optional(),
  ability: z.string().optional(),
});

const defaultValues: FormValues = {
  type: undefined,
  ability: undefined,
};

interface Pokemon {
  name: string;
  url: string;
}

const Pokedex = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [isLoadingFilteredPokemons, setIsLoadingFilteredPokemons] =
    useState(false);

  const [getPokemonsUrl, setGetPokemonsUrl] = useState(
    pokemonEndpoints.getPokemons,
  );

  // ** Hooks
  const { data: types, isLoading: isLoadingTypes } =
    usePokeApi<GetTypesResponse>(pokemonEndpoints.getTypes);
  const { data: abilities, isLoading: isLoadingAbilities } =
    usePokeApi<GetAbilitiesResponse>(pokemonEndpoints.getAbilities);
  const { data: pokemons, isLoading } =
    usePokeApi<GetPokemonsResponse>(getPokemonsUrl);

  // ** React Hook Form
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues,
    mode: "onSubmit",
    resolver: zodResolver(pokemonfilterSchema),
  });

  // ** Contants
  const itemsPerPage = 20;

  // ** Functions
  const filterPokemons = async (data: FormValues) => {
    console.log("running");
    setIsFiltered(true);
    setIsLoadingFilteredPokemons(true);
    if (data.type && data.ability) {
      try {
        const pokemonsByTypeReponse: AxiosResponse<GetTypeResponse> =
          await axios.get(`https://pokeapi.co/api/v2/type/${data.type}`);
        const pokemonsByAbilityReponse: AxiosResponse<GetAbilityResponse> =
          await axios.get(`https://pokeapi.co/api/v2/ability/${data.ability}`);

        setFilteredPokemons(
          pokemonsByTypeReponse.data.pokemon
            .map((p) => p.pokemon)
            .filter((p) =>
              pokemonsByAbilityReponse.data.pokemon
                .map((p) => p.pokemon)
                .some((a) => a.name === p.name),
            ),
        );
        setIsLoadingFilteredPokemons(false);
      } catch (error) {
        console.error(error);
        setIsLoadingFilteredPokemons(false);
      }
    } else if (data.type) {
      try {
        const pokemonsByTypeReponse: AxiosResponse<GetTypeResponse> =
          await axios.get(`https://pokeapi.co/api/v2/type/${data.type}`);
        setFilteredPokemons(
          pokemonsByTypeReponse.data.pokemon.map((p) => p.pokemon),
        );
        setIsLoadingFilteredPokemons(false);
      } catch (error) {
        console.error(error);
        setIsLoadingFilteredPokemons(false);
      }
    } else if (data.ability) {
      try {
        const pokemonsByAbilityReponse: AxiosResponse<GetAbilityResponse> =
          await axios.get(`https://pokeapi.co/api/v2/ability/${data.ability}`);
        setFilteredPokemons(
          pokemonsByAbilityReponse.data.pokemon.map((p) => p.pokemon),
        );
        setIsLoadingFilteredPokemons(false);
      } catch (error) {
        console.error(error);
        setIsLoadingFilteredPokemons(false);
      }
    }

    setIsLoadingFilteredPokemons(false);
    return;
  };

  console.log(isFiltered);

  const handeResetFilters = () => {
    console.log("resetting");
    reset();
    setIsFiltered(false);
    setFilteredPokemons([]);
  };

  const renderPokemons = (pokemons: GetPokemonsResponse) => {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {pokemons.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
        <div className="flex flex-col justify-start gap-5 lg:justify-between xl:flex-row">
          <div className="group flex items-center justify-between gap-5 rounded-full border-[3px] border-black bg-red-500 px-2 py-1 text-white">
            <Image
              width={30}
              height={30}
              alt="pokeball"
              src="/images/poke-ball.png"
              className="h-auto w-auto object-contain group-hover:animate-spin"
            />
            <p>
              Showing numbers {pokemons.results[0].url.split("/")[6]} to{" "}
              {pokemons.results[pokemons.results.length - 1].url.split("/")[6]}{" "}
              of {pokemons.count} Pokémons
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Button
              className="w-full rounded-full border border-primary bg-secondary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95"
              disabled={pokemons.previous === null}
              onClick={() =>
                pokemons.previous && setGetPokemonsUrl(pokemons.previous)
              }
            >
              <Icon
                fontSize={24}
                icon="akar-icons:arrow-left"
                className="text-primary transition duration-300 ease-in-out"
              />
            </Button>

            <Button
              className="w-full rounded-full border border-primary bg-secondary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95"
              disabled={pokemons.next === null}
              onClick={() => pokemons.next && setGetPokemonsUrl(pokemons.next)}
            >
              <Icon
                fontSize={24}
                icon="akar-icons:arrow-right"
                className="text-primary transition duration-300 ease-in-out"
              />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderFilteredPokemons = (filteredPokemons: Pokemon[]) => {
    const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {currentPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>

        <div className="flex flex-col justify-start gap-5 lg:flex-row lg:justify-between">
          <div
            className={`group flex items-center justify-between gap-5 rounded-full border-[3px] border-black bg-red-500 px-2 py-1 text-white ${filteredPokemons.length < 20 && "w-full"}`}
          >
            <Image
              width={30}
              height={30}
              alt="pokeball"
              src="/images/poke-ball.png"
              className="h-auto w-auto object-contain group-hover:animate-spin"
            />
            <p>
              Showing {itemsPerPage} Pokémons from {startIndex + 1} to{" "}
              {endIndex} of {filteredPokemons.length} Pokémons
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="w-full rounded-full bg-secondary transition duration-300 ease-in-out hover:bg-secondary-dark"
            >
              <Icon
                fontSize={24}
                icon="akar-icons:arrow-left"
                className="text-primary transition duration-300 ease-in-out"
              />
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="w-full rounded-full bg-secondary transition duration-300 ease-in-out hover:bg-secondary-dark"
            >
              <Icon
                fontSize={24}
                icon="akar-icons:arrow-right"
                className="text-primary transition duration-300 ease-in-out"
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
      <Card className="w-full p-5">
        <div className="group relative flex items-center gap-4 rounded-lg transition duration-300 ease-in-out ">
          <Icon
            fontSize={30}
            icon="bx:bx-search"
            className="text-gray-400 transition duration-300 ease-in-out group-hover:text-black dark:group-hover:text-white"
          />
          <Input
            placeholder="Search for a Pokémon by either name, number or type"
            className="border-none bg-transparent text-gray-400 shadow-none ease-in-out placeholder:transition placeholder:duration-300 focus:text-black group-hover:placeholder:translate-x-1"
          />
          <Button className="border border-primary bg-yellow-400 text-primary transition duration-300 ease-in-out  hover:bg-yellow-500 active:scale-95">
            Search
          </Button>
        </div>
      </Card>
      <div className="flex w-full flex-col justify-start gap-5 xl:relative xl:flex-row">
        <Card className="top-32 h-fit flex-1 p-5 xl:sticky">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(filterPokemons);
            }}
          >
            <div className="flex-col gap-5 space-y-5">
              <div className="flex flex-col gap-5">
                <Controller
                  name="type"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select defaultValue={value} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-background">
                        {types ? (
                          types.results.length !== 0 ? (
                            types.results
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((type) => (
                                <SelectItem
                                  key={type.name}
                                  value={type.name}
                                  className="dark:hover:bg-card"
                                >
                                  {fixWordCasing(type.name)}
                                </SelectItem>
                              ))
                          ) : (
                            <SelectItem
                              value="no-data"
                              className="dark:hover:bg-card"
                            >
                              No data available
                            </SelectItem>
                          )
                        ) : isLoadingTypes ? (
                          <SelectItem
                            value="loading"
                            className="dark:hover:bg-card"
                          >
                            Loading...
                          </SelectItem>
                        ) : (
                          <SelectItem
                            value="error"
                            className="dark:hover:bg-card"
                          >
                            Error fetching data
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />

                <Controller
                  name="ability"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ability" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-background">
                        {abilities ? (
                          abilities.results.length !== 0 ? (
                            abilities.results
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((type) => (
                                <SelectItem
                                  key={type.name}
                                  value={type.name}
                                  className="dark:hover:bg-card"
                                >
                                  {fixWordCasing(type.name)}
                                </SelectItem>
                              ))
                          ) : (
                            <SelectItem
                              value="no-data"
                              className="dark:hover:bg-card"
                            >
                              No data available
                            </SelectItem>
                          )
                        ) : isLoadingAbilities ? (
                          <SelectItem
                            value="loading"
                            className="dark:hover:bg-card"
                          >
                            Loading...
                          </SelectItem>
                        ) : (
                          <SelectItem
                            value="error"
                            className="dark:hover:bg-card"
                          >
                            Error fetching data
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="md-flex-row flex flex-col gap-5">
                <Button
                  type="submit"
                  className="xl: w-full border border-primary bg-primary text-secondary transition duration-300 ease-in-out hover:bg-primary-dark active:scale-95 dark:bg-secondary dark:text-primary dark:hover:bg-yellow-500"
                >
                  Apply
                </Button>
                <Button
                  onClick={() => {
                    console.log("resetting");
                    setIsFiltered(false);
                    setFilteredPokemons([]);
                    reset();
                  }}
                  className="xl: w-full border border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95 dark:bg-primary dark:text-secondary"
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Card>
        <div className="w-full flex-[3] flex-col items-start space-y-5 lg:flex-[5]">
          {isLoading || !pokemons || isLoadingFilteredPokemons ? (
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
          <Button className="w-full rounded-full border border-primary bg-secondary transition duration-300 ease-in-out hover:bg-secondary-dark">
            <Icon
              fontSize={24}
              icon="akar-icons:arrow-left"
              className="text-primary transition duration-300 ease-in-out"
            />
          </Button>

          <Button className="w-full rounded-full border border-primary bg-secondary transition duration-300 ease-in-out hover:bg-secondary-dark">
            <Icon
              fontSize={24}
              icon="akar-icons:arrow-right"
              className="text-primary transition duration-300 ease-in-out"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
