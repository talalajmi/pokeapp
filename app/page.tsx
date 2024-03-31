"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import usePokeApi from "@/lib/hooks/usePokeApi";
import pokemonEndpoints from "@/lib/services/api";
import PokemonCard from "@/components/PokemonCard";
import { getPokemonImageOfficial } from "@/lib/helpers";
import PokemonCarousel from "@/components/PokemonCarousel";
import PokemonCardLoadingSkeleton from "@/components/PokemonCardLoadingSkeleton";
import { GetPokemonsResponse } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [getPokemonsUrl, setGetPokemonsUrl] = useState(
    pokemonEndpoints.getPokemons,
  );

  // ** Hooks
  const { data: pokemons, isLoading } =
    usePokeApi<GetPokemonsResponse>(getPokemonsUrl);

  const renderPokemons = (pokemons: GetPokemonsResponse) => {
    return (
      <div className="space-y-5">
        <div className="flex flex-col justify-center gap-2">
          <div className="flex items-center justify-between">
            <p className="font-pokemon-solid text-3xl text-primary">
              All Pokémons
            </p>
            <div className="flex items-center justify-between gap-3">
              <Button
                disabled={pokemons.previous === null}
                onClick={() =>
                  pokemons.previous && setGetPokemonsUrl(pokemons.previous)
                }
                className="group rounded-full border border-primary bg-yellow-400 transition duration-300 ease-in-out hover:bg-yellow-500 active:scale-95"
              >
                <Icon
                  fontSize={20}
                  icon="akar-icons:arrow-left"
                  className="text-primary transition duration-300 ease-in-out "
                />
              </Button>
              <Button
                disabled={pokemons?.next === null}
                onClick={() =>
                  pokemons.next && setGetPokemonsUrl(pokemons.next)
                }
                className="group rounded-full border border-primary bg-yellow-400 transition duration-300 ease-in-out hover:bg-yellow-500 active:scale-95"
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
            There are a total of {pokemons?.count} Pokémon in the database. Here
            are some of them:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {pokemons.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
        <section className="w-full">
          <div className="flex items-center justify-between gap-5">
            <Button
              disabled={pokemons.previous === null}
              onClick={() =>
                pokemons.previous && setGetPokemonsUrl(pokemons.previous)
              }
              className="w-full rounded-full border border-primary bg-secondary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95"
            >
              <Icon
                fontSize={20}
                className="text-primary"
                icon="akar-icons:arrow-left"
              />
            </Button>
            <p className="w-full text-center font-pokemon-hollow text-2xl text-primary dark:text-secondary">
              {`Page ${
                pokemons.previous
                  ? Number(pokemons.previous.match(/offset=(\d+)/)![1]) / 20 + 1
                  : 1
              } of ${Math.ceil(pokemons.count / 20)}`}
            </p>
            <Button
              disabled={pokemons.next === null}
              onClick={() => pokemons.next && setGetPokemonsUrl(pokemons.next)}
              className="w-full rounded-full border border-primary bg-secondary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95"
            >
              <Icon
                fontSize={20}
                className="text-primary"
                icon="akar-icons:arrow-right"
              />
            </Button>
          </div>
        </section>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10">
      <section>
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="max-w-[700px] space-y-2">
            <h1 className="font-pokemon-solid text-3xl text-primary sm:text-5xl">
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
            <h2 className="font-pokemon-solid text-3xl text-primary sm:text-4xl">
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
              src={getPokemonImageOfficial(25)}
              className="h-auto w-auto object-contain"
            />
          </div>
        </div>
      </section>
      <section className="w-full space-y-4">
        {isLoading || !pokemons ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center justify-between">
                <p className="font-pokemon-solid text-3xl text-primary">
                  All Pokémons
                </p>
                <div className="flex items-center justify-between gap-3">
                  <Button className="group rounded-full border border-primary bg-yellow-400 transition duration-300 ease-in-out hover:bg-yellow-500 active:scale-95">
                    <Icon
                      fontSize={20}
                      icon="akar-icons:arrow-left"
                      className="text-primary transition duration-300 ease-in-out "
                    />
                  </Button>
                  <Button className="group rounded-full border border-primary bg-yellow-400 transition duration-300 ease-in-out hover:bg-yellow-500 active:scale-95">
                    <Icon
                      fontSize={20}
                      icon="akar-icons:arrow-right"
                      className="text-primary transition duration-300 ease-in-out "
                    />
                  </Button>
                </div>
              </div>
              <Skeleton className="h-6 w-96 bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
              {Array.from({ length: 20 }).map((_, index) => (
                <PokemonCardLoadingSkeleton key={index} />
              ))}
            </div>
            <section className="w-full">
              <div className="flex items-center justify-between gap-5">
                <Button className="w-full rounded-full border border-primary bg-secondary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95">
                  <Icon
                    fontSize={20}
                    className="text-primary"
                    icon="akar-icons:arrow-left"
                  />
                </Button>
                <Skeleton className="h-6 w-[120rem] bg-gray-200" />
                <Button className="w-full rounded-full border border-primary bg-secondary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95">
                  <Icon
                    fontSize={20}
                    className="text-primary"
                    icon="akar-icons:arrow-right"
                  />
                </Button>
              </div>
            </section>
          </div>
        ) : (
          renderPokemons(pokemons)
        )}
      </section>

      <section>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="font-pokemon-solid text-3xl text-primary dark:text-secondary">
              About Pokémon
            </h2>
            <p className=" text-black dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Pokémon is a media franchise created by Satoshi Tajiri and Ken
              Sugimori and is owned by Nintendo, Game Freak, and Creatures. The
              franchise was created by Satoshi Tajiri in 1995 and is centered on
              fictional creatures called &quot;Pokémon&quot;. In Pokémon,
              humans, known as Pokémon Trainers, catch and train Pokémon to
              battle each other for sport. The franchise began with the release
              of the Pokémon Red and Green video games
            </p>

            <p className=" text-black dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The franchise has since expanded to include an animated series, a
              trading card game, an animated film series, and merchandise. The
              Pokémon franchise is the second highest-grossing media franchise
              of all time, behind only the Mario franchise. The franchise is
              also the highest-grossing media franchise of all time, with an
              estimated $100 billion in total revenue.
            </p>

            <p className=" text-black dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The Pokémon franchise has had a significant impact on popular
              culture, with Pokémon becoming one of the most recognizable and
              iconic franchises in the world. The franchise has also been
              credited with helping to popularize the handheld video game
              console, with the release of the Pokémon Red and Blue video games
              helping to boost sales The Pokémon franchise has also been
              credited with helping to popularize the handheld video game
              console, with the release of the Pokémon Red and Blue video games
              helping to boost sales of the
            </p>
          </div>
          <div className="mx-auto">
            <Image
              width="200"
              height="200"
              alt="Pokémon"
              src={getPokemonImageOfficial(25)}
              className="h-auto w-auto object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
