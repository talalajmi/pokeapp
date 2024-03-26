"use client";

import Image from "next/image";
import Link from "next/link";
import { getPokemonImage } from "@/lib/helpers";
import useGetPokemons from "@/lib/hooks/useGetPokemons";
import LoadingSpinner from "@/components/LoadingSpinner";
import PokemonCarousel from "@/components/PokemonCarousel";

export default function Home() {
  // ** Hooks
  const { data, isLoading } = useGetPokemons();

  if (isLoading)
    return (
      <div className="flex h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-8">
      <section className="w-full py-6 md:py-12">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="max-w-[700px] space-y-2">
            <h1 className="text-3xl text-blue-600 font-bold tracking-tighter sm:text-5xl">
              Welcome to the World of Pokémon
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Gotta catch &apos;em all!
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
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
              className="w-auto h-auto object-contain"
            />
          </div>
        </div>
      </section>
      <section className="w-full space-y-4">
        <p className="text-3xl font-bold tracking-tighter">All Pokémons</p>
        <p>
          There are a total of {data?.count} Pokémon in the database. Here are
          some of them:
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data ? (
            data.results.map((pokemon) => (
              <Link
                key={pokemon.name}
                href={`/pokemon/${pokemon.url.split("/")[6]}`}
              >
                <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-md shadow-md">
                  <Image
                    width={150}
                    height={150}
                    alt={pokemon.name}
                    className="w-150 h-150 object-contain"
                    src={getPokemonImage(parseInt(pokemon.url.split("/")[6]))}
                  />
                  <p className="text-lg font-semibold">{pokemon.name}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex justify-center items-center h-32">
              No data available
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
