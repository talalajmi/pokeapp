"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PokemonCard from "@/components/PokemonCard";
import { useGetPokemons } from "@/lib/hooks";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import { GetPokemonsResponse } from "@/lib/types";
import { Card } from "@/components/ui/card";

const Pokedex = () => {
  const [offset, setOffset] = useState(0);

  // ** Hooks
  const { data: pokemons, isLoading } = useGetPokemons(offset);

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

  return (
    <div className="mt-5 flex w-full flex-col items-center space-y-5">
      <h1 className="text-3xl text-primary sm:text-4xl">Pokédex</h1>
      <div className="group relative flex w-full items-center gap-4 rounded-lg border border-primary/50 p-4 transition duration-300 ease-in-out hover:border-primary">
        <div>
          <Icon
            icon="bx:bx-search"
            className="text-gray-400 transition duration-300 ease-in-out group-hover:text-black dark:group-hover:text-white"
            fontSize={24}
          />
        </div>
        <Input
          placeholder="Search for a Pokémon by either name, number or type"
          className="border-none text-gray-400 ease-in-out placeholder:transition placeholder:duration-300 focus:text-black group-hover:placeholder:translate-x-1"
        />
        <Button className="bg-yellow-400 text-primary transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 active:scale-95">
          Search
        </Button>
      </div>
      <div className="flex w-full flex-col justify-start gap-5 md:flex-row">
        <Card className="h-fit flex-1 flex-col gap-5 space-y-5 p-5">
          <div className="flex flex-col gap-5">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="ground">Ground</SelectItem>
                <SelectItem value="water">Water</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md-flex-row flex flex-col gap-5">
            <Button className="w-full bg-primary text-secondary transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-500 active:scale-95 dark:bg-secondary dark:text-primary">
              Apply
            </Button>
            <Button className="w-full border border-primary bg-transparent text-primary transition duration-300 ease-in-out hover:scale-110 hover:bg-gray-100 active:scale-95">
              Reset
            </Button>
          </div>
        </Card>
        <div className="w-full flex-[3] flex-col items-start space-y-5 lg:flex-[5]">
          <Card className=" flex w-full flex-col items-start justify-between gap-5 p-5 md:flex-row">
            <Select>
              <SelectTrigger className="w-full md:w-[350px]">
                <SelectValue placeholder="Sort by Number" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ascending">Ascending</SelectItem>
                <SelectItem value="descending">Descending</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
              <p>Number Range</p>
              <div className="flex items-center gap-5">
                <Input placeholder="From" />
                <p>-</p>
                <Input placeholder="To" />
              </div>
            </div>
          </Card>
          {isLoading ? (
            <LoadingSpinner />
          ) : !pokemons ? (
            <div className="flex h-32 items-center justify-center">
              No data available
            </div>
          ) : (
            renderPokemons(pokemons)
          )}
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
