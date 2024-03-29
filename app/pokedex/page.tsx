"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useGetPokemons } from "@/lib/hooks";
import { Input } from "@/components/ui/input";
import { fixWordCasing } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import {
  GetAbilityResponse,
  GetPokemonsResponse,
  GetTypeResponse,
} from "@/lib/types";
import useGetTypes from "@/lib/hooks/useGetTypes";
import PokemonCard from "@/components/PokemonCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import useGetAbilities from "@/lib/hooks/useGetAbilities";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { AxiosResponse } from "axios";

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
  const [offset, setOffset] = useState(0);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues,
    mode: "onSubmit",
    resolver: zodResolver(pokemonfilterSchema),
  });

  // ** Functions
  const filterPokemons = async (data: FormValues) => {
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
      } catch (error) {
        console.error(error);
      }
    } else if (data.type) {
      try {
        const pokemonsByTypeReponse: AxiosResponse<GetTypeResponse> =
          await axios.get(`https://pokeapi.co/api/v2/type/${data.type}`);

        setFilteredPokemons(
          pokemonsByTypeReponse.data.pokemon.map((p) => p.pokemon),
        );
      } catch (error) {
        console.error(error);
      }
    } else if (data.ability) {
      try {
        const pokemonsByAbilityReponse: AxiosResponse<GetAbilityResponse> =
          await axios.get(`https://pokeapi.co/api/v2/ability/${data.ability}`);

        setFilteredPokemons(
          pokemonsByAbilityReponse.data.pokemon.map((p) => p.pokemon),
        );
      } catch (error) {
        console.error(error);
      }
    }

    return;
  };

  const handeResetFilters = () => {
    reset(defaultValues);
    setFilteredPokemons([]);
  };

  // ** Hooks
  const { data: pokemons, isLoading } = useGetPokemons(offset);
  const { data: types, isLoading: isLoadingTypes } = useGetTypes();
  const { data: abilities, isLoading: isLoadingAbilities } = useGetAbilities();

  const renderPokemons = (pokemons: GetPokemonsResponse) => {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {pokemons.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
        <div className="flex flex-col justify-start gap-5 lg:flex-row lg:justify-between">
          <div className="group flex items-center justify-between gap-5 rounded-full border-[3px] border-black bg-red-500 px-2 py-1 text-white">
            <Image
              width={30}
              height={30}
              alt="pokeball"
              src="/images/poke-ball.png"
              className="h-auto w-auto object-contain group-hover:animate-spin"
            />
            <p>
              Showing {pokemons.results.length} of {pokemons.count} Pokémons
            </p>
          </div>

          <Pagination
            currentPage={offset / 20 + 1}
            totalPages={Math.ceil(pokemons.count / 20)}
            onPageChange={(page) => setOffset((page - 1) * 20)}
          />
        </div>
      </div>
    );
  };

  const renderFilteredPokemons = (filteredPokemons: Pokemon[]) => {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredPokemons.map((pokemon) => (
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
              Showing{" "}
              {filteredPokemons.length > 20 ? 20 : filteredPokemons.length} of{" "}
              {filteredPokemons.length}{" "}
              {filteredPokemons.length > 1 ? "Pokémons" : "Pokémon"}
            </p>
          </div>

          {filteredPokemons.length > 20 && (
            <Pagination
              currentPage={offset / 20 + 1}
              totalPages={Math.ceil(filteredPokemons.length / 20)}
              onPageChange={(page) => setOffset((page - 1) * 20)}
            />
          )}
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
            fontSize={24}
            icon="bx:bx-search"
            className="text-gray-400 transition duration-300 ease-in-out group-hover:text-black dark:group-hover:text-white"
          />
          <Input
            placeholder="Search for a Pokémon by either name, number or type"
            className="border-none bg-transparent text-gray-400 shadow-none ease-in-out placeholder:transition placeholder:duration-300 focus:text-black group-hover:placeholder:translate-x-1"
          />
          <Button className="border border-primary bg-yellow-400 text-primary transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 active:scale-95">
            Search
          </Button>
        </div>
      </Card>
      <div className="flex w-full flex-col justify-start gap-5 md:flex-row">
        <Card className="h-fit flex-1 p-5">
          <form onSubmit={handleSubmit(filterPokemons)}>
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
                            types.results.map((type: any) => (
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
                            abilities.results.map((ability: any) => (
                              <SelectItem
                                key={ability.name}
                                value={ability.name}
                                className="dark:hover:bg-card"
                              >
                                {fixWordCasing(ability.name)}
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
                  className="hover:bg-primary-dark w-full border border-primary bg-primary text-secondary transition duration-300 ease-in-out hover:scale-110 active:scale-95 dark:bg-secondary dark:text-primary dark:hover:bg-yellow-500"
                >
                  Apply
                </Button>
                <Button
                  onClick={handeResetFilters}
                  className="hover:bg-secondary-dark w-full border border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:scale-110 active:scale-95 dark:bg-primary dark:text-secondary"
                >
                  Reset
                </Button>
              </div>
            </div>
          </form>
        </Card>
        <div className="w-full flex-[3] flex-col items-start space-y-5 lg:flex-[5]">
          {isLoading ? (
            <LoadingSpinner />
          ) : filteredPokemons.length === 0 && pokemons ? (
            renderPokemons(pokemons)
          ) : filteredPokemons.length > 0 ? (
            renderFilteredPokemons(filteredPokemons)
          ) : (
            <div>No data Available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
