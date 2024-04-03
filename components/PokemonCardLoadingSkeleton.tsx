import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "./ui/card";

const PokemonCardLoadingSkeleton = () => {
  return (
    <Card className="group relative transition duration-300 ease-in-out hover:border-primary hover:bg-blue-500/20 dark:hover:border-yellow-400 dark:hover:bg-yellow-400/20">
      <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-primary p-2 text-white dark:bg-secondary dark:text-primary">
        <Skeleton className="h-7 w-6 rounded-full bg-gray-200 dark:bg-gray-500" />
      </div>
      <CardContent className="flex aspect-square flex-col items-center justify-around gap-5">
        <Skeleton className="mt-1 h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-500 sm:mt-0 sm:h-44 sm:w-44" />
        <div className="flex w-full flex-col items-center justify-between gap-3">
          <Skeleton className="h-4 w-[6rem] bg-gray-200 dark:bg-gray-500" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-[8rem] bg-gray-200 dark:bg-gray-500 " />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCardLoadingSkeleton;
