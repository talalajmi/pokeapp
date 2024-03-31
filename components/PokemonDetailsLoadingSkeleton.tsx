"use client";

import React from "react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import LongArrowRight from "./LongArrowRight";
import { Card, CardContent } from "./ui/card";

const PokemonDetailsLoadingSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-5">
      <div className="flex w-full items-center justify-between">
        <Button className="rounded-full border border-primary bg-secondary transition duration-300 ease-out hover:bg-secondary-dark  active:scale-95">
          <Icon
            fontSize={24}
            icon="akar-icons:arrow-left"
            className="text-primary-dark"
          />
        </Button>
        <Skeleton className="h-12 w-56 bg-gray-200" />
        <Button className="rounded-full border border-primary bg-secondary transition duration-300 ease-out hover:bg-secondary-dark  active:scale-95">
          <Icon
            fontSize={24}
            icon="akar-icons:arrow-right"
            className="text-primary-dark"
          />
        </Button>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col gap-10 p-5">
          <div className="grid h-full w-full grid-cols-1 gap-10 xl:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <Skeleton className="h-80 w-80 rounded-full bg-gray-200 lg:h-96 lg:w-96" />

              <Skeleton className="h-10 w-40 bg-gray-200" />
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <Skeleton className="h-6 w-40 bg-gray-200" />
                <Skeleton className="h-8 w-24 rounded-full bg-gray-200" />
              </div>
              <div className="flex flex-col gap-5">
                <Skeleton className="h-6 w-80 bg-gray-200" />
                <div className="flex items-center gap-2">
                  <p>Height:</p>
                  <Skeleton className="h-6 w-40 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <p>Weight:</p>
                  <Skeleton className="h-6 w-40 bg-gray-200" />
                </div>
                <div className="flex items-center gap-2">
                  <p>Abilities:</p>
                  <Skeleton className="h-6 w-40 bg-gray-200" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <p>Moves:</p>
                <Skeleton className="h-6 w-40 bg-gray-200" />
              </div>
              <div className="flex flex-col">
                <Skeleton className="h-6 w-40 bg-gray-200" />

                <div className="flex flex-col gap-4 md:flex-row">
                  <Button className="mt-5 w-full rounded-full border-2 border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95">
                    <Skeleton className="h-6 w-40 bg-gray-200" />
                  </Button>
                  <Button className="mt-5 w-full rounded-full border-2 border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95">
                    <Skeleton className="h-6 w-40 bg-gray-200" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex w-full flex-col gap-4">
              <Skeleton className="h-6 w-52 bg-gray-200" />

              <Skeleton className="h-6 w-96 bg-gray-200" />
              <Skeleton className="h-6 w-96 bg-gray-200" />
              <Skeleton className="h-6 w-96 bg-gray-200" />
              <Skeleton className="h-6 w-96 bg-gray-200" />
              <Skeleton className="h-6 w-96 bg-gray-200" />
              <Skeleton className="h-6 w-96 bg-gray-200" />
            </div>
            <div className="flex w-full flex-col gap-5">
              <Skeleton className="h-6 w-72 bg-gray-200" />
              <div className="flex items-center gap-5">
                <Skeleton className="h-72 w-72 bg-gray-200" />
                <LongArrowRight
                  width={150}
                  height={150}
                  className="h-auto w-auto rotate-90 fill-primary dark:fill-secondary md:rotate-0"
                />
                <Skeleton className="h-72 w-72 bg-gray-200" />
              </div>
            </div>
          </div>
          <Separator className="dark:bg-yellow-400/10" />
          <div className="space-y-3">
            <Skeleton className="h-6 w-[30rem] bg-gray-200" />
            <Skeleton className="h-6 w-full bg-gray-200" />
            <Skeleton className="h-6 w-full bg-gray-200" />
            <Skeleton className="h-6 w-full bg-gray-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonDetailsLoadingSkeleton;
