"use client";

// ** React Imports
import React from "react";

// ** Component Imports
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import LongArrowRight from "./LongArrowRight";
import { Card, CardContent } from "./ui/card";

// ** Icon Imports
import { Icon } from "@iconify/react";
import Link from "next/link";
import { routes } from "@/lib/constants";

const PokemonDetailsLoadingSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-5">
      <div className="flex w-full items-center justify-between gap-5 lg:flex-row">
        <Link href={routes.pokedex} className="w-full">
          <Button className="btn-secondary gap-3 ">
            <Icon
              fontSize={24}
              icon="akar-icons:arrow-left"
              className="text-primary"
            />
            Back to Pokédex
          </Button>
        </Link>
        <Skeleton className="h-9  w-56 bg-gray-200 dark:bg-gray-500" />
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-10 p-5">
          <div className="grid h-full w-full grid-cols-1 gap-10 xl:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <Skeleton className="h-80 w-80 rounded-full bg-gray-200 dark:bg-gray-500 lg:h-96 lg:w-96" />

              <Skeleton className="h-10 w-40 bg-gray-200 dark:bg-gray-500" />
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-500" />
                <Skeleton className="h-8 w-24 rounded-full bg-gray-200 dark:bg-gray-500" />
              </div>
              <div className="flex flex-col gap-5">
                <Skeleton className="h-6 w-80 bg-gray-200 dark:bg-gray-500" />
                <div className="flex items-center gap-2">
                  <p>Height:</p>
                  <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-500" />
                </div>
                <div className="flex items-center gap-2">
                  <p>Weight:</p>
                  <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-500" />
                </div>
                <div className="flex items-center gap-2">
                  <p>Abilities:</p>
                  <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-500" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <p>Moves:</p>
                <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-500" />
              </div>
              <div className="flex flex-col">
                <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-500" />

                <div className="flex flex-col gap-4 md:flex-row">
                  <Button className="default-transition mt-5 w-full rounded-full border-2 border-primary bg-secondary text-primary hover:bg-secondary-dark active:scale-95">
                    <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-500" />
                  </Button>
                  <Button className="default-transition mt-5 w-full rounded-full border-2 border-primary bg-secondary text-primary hover:bg-secondary-dark active:scale-95">
                    <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-10 xl:flex-row">
            <div className="flex w-full flex-col gap-4">
              <Skeleton className="h-6 w-52 bg-gray-200 dark:bg-gray-500" />

              <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500 md:w-96" />
              <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500 md:w-96" />
              <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500 md:w-96" />
              <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500 md:w-96" />
              <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500 md:w-96" />
              <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500 md:w-96" />
            </div>
            <div className="flex w-full flex-col items-center justify-start gap-5 md:items-start">
              <Skeleton className="h-6 w-72 bg-gray-200 dark:bg-gray-500" />
              <div className="flex flex-col items-center gap-5 md:flex-row">
                <Skeleton className="md:w-50 h-52 w-52 bg-gray-200 dark:bg-gray-500 md:h-64 lg:h-72 lg:w-72" />
                <LongArrowRight
                  width={150}
                  height={150}
                  className="h-auto w-auto rotate-90 fill-primary dark:fill-secondary md:rotate-0"
                />
                <Skeleton className="md:w-50 h-52 w-52 bg-gray-200 dark:bg-gray-500 md:h-64 lg:h-72 lg:w-72" />
              </div>
            </div>
          </div>
          <Separator className="dark:bg-yellow-400/10" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500 md:w-[30rem]" />
            <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500" />
            <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500" />
            <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500" />
          </div>
        </CardContent>
      </Card>
      <div className="flex w-full items-center justify-between">
        <Button className="rounded-full border border-primary bg-secondary transition duration-300 ease-out hover:bg-secondary-dark  active:scale-95">
          <Icon
            fontSize={24}
            icon="akar-icons:arrow-left"
            className="text-primary-dark"
          />
        </Button>
        <Button className="rounded-full border border-primary bg-secondary transition duration-300 ease-out hover:bg-secondary-dark  active:scale-95">
          <Icon
            fontSize={24}
            icon="akar-icons:arrow-right"
            className="text-primary-dark"
          />
        </Button>
      </div>
    </div>
  );
};

export default PokemonDetailsLoadingSkeleton;
