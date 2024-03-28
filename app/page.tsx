"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { getPokemonImage } from "@/lib/helpers";
import PokemonCard from "@/components/PokemonCard";
import useGetPokemons from "@/lib/hooks/useGetPokemons";
import LoadingSpinner from "@/components/LoadingSpinner";
import PokemonCarousel from "@/components/PokemonCarousel";

export default function Home() {
  // ** States
  const [offset, setOffset] = useState(0);

  // ** Hooks
  const { data, isLoading } = useGetPokemons(offset);

  const fetchNextPage = () => {
    setOffset(offset + 20);
  };

  const fetchPreviousPage = () => {
    setOffset(offset - 20);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="w-full">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="max-w-[700px] space-y-2">
            <h1 className="font-pokemon-solid text-3xl tracking-widest text-blue-600 sm:text-5xl">
              Welcome to the World of Pokémon
            </h1>
            <p className=" text-black dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore the Pokémon universe with our comprehensive database.
              Enter a name or select a type to get started.
            </p>
          </div>
        </div>
      </section>
      <section>
        <PokemonCarousel />
      </section>
      <section className="w-full py-6 md:py-12">
        <div className="grid items-center gap-4 md:gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <h2 className="font-pokemon-solid text-3xl tracking-widest text-primary sm:text-4xl">
              Gotta catch &apos;em all!
            </h2>
            <p className=" text-black dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The world of Pokémon is vast and full of wonders. Our app helps
              you discover and learn about all the amazing creatures in the
              Pokémon universe. Whether you&apos;re a seasoned Trainer or just
              starting your journey, our comprehensive database has everything
              you need to become a Pokémon Master.
            </p>
          </div>
          <div className="mx-auto">
            <Image
              width="200"
              height="200"
              alt="Pokémon"
              src={getPokemonImage(25)}
              className="h-auto w-auto object-contain"
            />
          </div>
        </div>
      </section>
      <section className="w-full space-y-4">
        <div className="flex justify-between">
          <p className="font-pokemon-solid text-3xl tracking-widest text-primary">
            All Pokémons
          </p>
          <div className="flex items-center justify-between gap-3">
            <Button
              onClick={fetchPreviousPage}
              disabled={data?.previous === null}
              className="group rounded-full border border-primary bg-yellow-400 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 active:scale-95"
            >
              <Icon
                fontSize={20}
                icon="akar-icons:arrow-left"
                className="text-primary transition duration-300 ease-in-out "
              />
            </Button>
            <Button
              disabled={data?.next === null}
              onClick={fetchNextPage}
              className="group rounded-full border border-primary bg-yellow-400 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 active:scale-95"
            >
              <Icon
                fontSize={20}
                icon="akar-icons:arrow-right"
                className="text-primary transition duration-300 ease-in-out "
              />
            </Button>
          </div>
        </div>
        <p className=" dark:text-gray-400">
          There are a total of {data?.count} Pokémon in the database. Here are
          some of them:
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : data ? (
            data.results.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))
          ) : (
            <div className="flex items-center justify-center">
              No data available
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
