"use client";

// ** React Imports
import React from "react";

// ** Next.js Imports
import Link from "next/link";
import Image from "next/image";

// ** Component Imports
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import PokemonCarousel from "@/components/PokemonCarousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// ** Icon Imports
import { Icon } from "@iconify/react";

// ** Custom Hooks and Types
import { getPokemonImageOfficial } from "@/lib/helpers";

// ** Constants
import { routes } from "@/lib/constants";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "mdi:pokeball",
    title: "Pokedex",
    description:
      "Use the Pokedex to search for your favorite Pokemon. You can also view the details of each Pokemon, including their abilities, types, and stats.",
  },
  {
    icon: "mdi:search",
    title: "Search",
    description:
      "You can search for Pokemon by name, our library of Pokemon is huge and you can find any Pokemon you want.",
  },
  {
    icon: "mdi:filter-outline",
    title: "Filter",
    description:
      "You can filter Pokemon by type and ability. This will help you to find the Pokemon you are looking for.",
  },
  {
    icon: "mdi:theme-light-dark",
    title: "Dark Mode",
    description:
      "Navigate PokeApp in dark mode. You can switch between dark and light mode. Choose the mode that suits you.",
  },
];

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <Card
      className={`hover:border-1 default-transition group border bg-card p-5 hover:border-blue-500 hover:bg-blue-500/10 dark:hover:border-yellow-500 dark:hover:bg-yellow-500/10`}
    >
      <CardHeader>
        <div className="flex w-full justify-start">
          <Icon
            fontSize={52}
            icon={feature.icon}
            className={`default-transition group-hover:text-primary group-hover:dark:text-secondary`}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <h3 className="group-hover: default-transition text-xl group-hover:text-primary group-hover:dark:text-secondary">
          {feature.title}
        </h3>
        <p>{feature.description}</p>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col justify-center gap-20">
      <div className="mx-auto flex w-full flex-col-reverse items-center justify-between gap-10 md:flex-row">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl text-primary dark:text-secondary md:text-3xl lg:text-4xl">
            Explore the World of Pokemon
          </h1>
          <p className="max-w-[800px] text-lg ">
            Explore the world of Pokemon with PokeApp. Search for your favorite
            Pokemon, abilities, and types. You can also view the details of each
            Pokemon, including their abilities, types, and stats. Get started by
            clicking the button below.
          </p>
          <Link href={routes.pokedex}>
            <Button className="default-transition btn-press-effect w-fit rounded-full border border-primary bg-secondary p-6 text-lg text-primary shadow-md hover:bg-secondary-dark">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="w-2/3 rounded-full border-2 border-primary bg-secondary p-10 md:w-1/2 xl:w-1/4">
          <Image
            width={300}
            height={300}
            alt="pokeapp"
            src={getPokemonImageOfficial(123)}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col items-center gap-10">
        <h2 className="text-3xl text-primary dark:text-secondary">Features</h2>
        <div className="flex flex-col gap-10 xl:flex-row">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col-reverse items-center justify-between gap-10 md:flex-row">
        <div className="space-y-5">
          <h2 className="text-3xl text-primary dark:text-secondary">
            Discover Your Favorite Pokémon in a Whole New Way!
          </h2>
          <p className="mb-4 max-w-[800px] text-lg ">
            With PokeApp, you can enjoy the following features:
          </p>
          <ul className="max-w-[800px] list-inside list-disc text-lg ">
            <li>Explore detailed profiles of your favorite Pokémon</li>
            <li>Search quickly and easily with our intuitive interface</li>
            <li>Enjoy a responsive design that works on any device</li>
            <li>Toggle between light and dark mode for your viewing comfort</li>
          </ul>
        </div>
        <div className="w-2/3 rounded-full border-2 border-primary bg-secondary p-10 md:w-1/2 xl:w-1/4">
          <Image
            width={300}
            height={300}
            alt="pokeapp"
            src={getPokemonImageOfficial(987)}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col items-center justify-between gap-10 md:flex-row">
        <div className="w-2/3 rounded-full border-2 border-secondary bg-primary-dark p-10 md:w-1/2 xl:w-1/4">
          <Image
            width={300}
            height={300}
            alt="pokeapp"
            src={getPokemonImageOfficial(852)}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="space-y-5">
          <h2 className="text-3xl text-primary dark:text-secondary">
            Dive into the Fascinating World of Pokémon!
          </h2>
          <p className="mb-4 max-w-[800px] text-lg ">
            Experience the magic of Pokémon like never before:
          </p>
          <ul className="max-w-[800px] list-inside list-disc text-lg ">
            <li>Discover over 800 unique species in the Pokémon universe</li>
            <li>Learn about the diverse habitats and behaviors of Pokémon</li>
            <li>
              Understand the intricate relationships between different Pokémon
              types
            </li>
            <li>
              Explore the evolution chains and see how your favorite Pokémon
              evolve
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col items-center gap-10">
        <span className="text-3xl text-primary dark:text-secondary">
          Ready to Catch &apos;Em All?
        </span>
        <PokemonCarousel />
      </div>
      <div className="mx-auto flex w-full flex-col items-center gap-10">
        <h2 className="text-3xl text-primary dark:text-secondary">FAQ</h2>

        <div className="flex w-full flex-col gap-10">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem
              value="item-1"
              className="rounded-lg bg-card px-5 pt-3 shadow-sm"
            >
              <AccordionTrigger className=" default-transition no-underline hover:text-black hover:dark:text-white">
                How do I search for a Pokémon?
              </AccordionTrigger>
              <AccordionContent className="">
                You can search for a Pokémon by name using the search bar at the
                top of the page. Simply type in the name of the Pokémon you are
                looking for, and the search results will display the
                Pokémon&apos;s name, image, and type.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="rounded-lg bg-card px-5 pt-3 shadow-sm"
            >
              <AccordionTrigger className=" default-transition hover:text-black hover:dark:text-white">
                How do I filter Pokémon by type?
              </AccordionTrigger>
              <AccordionContent className="">
                To filter Pokémon by type, use the dropdown menu on the Pokedex
                page. You can select a type from the list of available types,
                and the search results will display Pokémon of that type.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="rounded-lg bg-card px-5 pt-3 shadow-sm"
            >
              <AccordionTrigger className=" default-transition hover:text-black hover:dark:text-white">
                How do I filter Pokémon by ability?
              </AccordionTrigger>
              <AccordionContent className="">
                To filter Pokémon by ability, use the dropdown menu on the
                Pokedex page. You can select an ability from the list of
                available abilities, and the search results will display Pokémon
                with that ability.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="rounded-lg bg-card px-5 pt-3 shadow-sm"
            >
              <AccordionTrigger className=" default-transition hover:text-black hover:dark:text-white">
                How do I view detailed information about a Pokémon?
              </AccordionTrigger>
              <AccordionContent className="">
                To view detailed information about a Pokémon, click on the
                Pokémon&apos;s card in the search results. This will take you to
                the Pokémon&apos;s profile page, where you can see information
                such as the Pokémon&apos;s abilities, types, and stats.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="rounded-lg bg-card px-5 pt-3 shadow-sm"
            >
              <AccordionTrigger className=" default-transition hover:text-black hover:dark:text-white">
                How do I switch between light and dark mode?
              </AccordionTrigger>
              <AccordionContent className="">
                To switch between light and dark mode, click on the theme
                switcher icon in the top right corner of the page. This will
                toggle between light and dark mode, depending on your
                preference.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-3xl font-bold">
          Ready to start your Pokémon journey?
        </h2>
        <p className="text-lg">
          Start exploring the fascinating world of Pokémon today!
        </p>
        <Link href={routes.pokedex}>
          <Button className="default-transition rounded-full border border-primary bg-secondary p-7 text-lg font-bold text-primary hover:bg-secondary-dark active:scale-95">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
