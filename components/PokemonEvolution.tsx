"use client";

import { Fragment } from "react";
import { fixWordCasing } from "@/lib/helpers";
import usePokeApi from "@/lib/hooks/usePokeApi";
import { pokemonEndpoints } from "@/lib/services";
import PokemonCard from "@/components/PokemonCard";
import { PokemonEvolutionChain } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import LongArrowRight from "@/components/LongArrowRight";
import { EvolutionChain } from "@/lib/types/PokemonEvolution";

interface PokemonDetailsProps {
  evolutionId: number;
}

const PokemonEvolution = (props: PokemonDetailsProps) => {
  // ** Props
  const { data: pokemonEvolutionChain, isLoading } =
    usePokeApi<PokemonEvolutionChain>(
      pokemonEndpoints.getPokemonEvolution(props.evolutionId),
    );

  return (
    <div>
      {isLoading ? (
        <div className="mb-5 flex flex-col gap-5">
          <Skeleton className="h-10 w-60 bg-gray-200 dark:bg-gray-500" />
          <Skeleton className="h-6 w-full bg-gray-200 dark:bg-gray-500 md:w-96" />
          <div className="flex flex-col items-center gap-5 lg:flex-row">
            <Skeleton className="h-64 w-60 bg-gray-200 dark:bg-gray-500" />
            <LongArrowRight
              width={150}
              height={150}
              className="h-auto w-auto rotate-90 fill-gray-200 dark:fill-gray-500 lg:rotate-0"
            />
            <Skeleton className="h-64 w-60 bg-gray-200 dark:bg-gray-500" />
            <LongArrowRight
              width={150}
              height={150}
              className="h-auto w-auto rotate-90 fill-gray-200 dark:fill-gray-500 lg:rotate-0"
            />
            <Skeleton className="h-64 w-60 bg-gray-200 dark:bg-gray-500" />
          </div>
        </div>
      ) : pokemonEvolutionChain ? (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-primary dark:text-secondary">
            Evolution Chain:
          </h1>
          <EvolutionSentence evolutionChain={pokemonEvolutionChain} />
          <div className="flex flex-col items-center gap-5 lg:flex-row">
            {pokemonEvolutionChain.chain && (
              <Evolution evolution={pokemonEvolutionChain.chain} />
            )}
          </div>
        </div>
      ) : (
        "Error"
      )}{" "}
    </div>
  );
};

export default PokemonEvolution;

const Evolution = ({ evolution }: { evolution: EvolutionChain }) => {
  return (
    <div className="flex flex-col items-center gap-5 lg:flex-row">
      <PokemonCard
        pokemon={{
          name: evolution.species.name,
          url: evolution.species.url,
        }}
      />
      {evolution.evolves_to.length > 0 &&
        evolution.evolves_to.map((nextEvolution, i) => (
          <Fragment key={i}>
            <LongArrowRight
              width={150}
              height={150}
              className="rotate-90 animate-pulse fill-primary dark:fill-secondary lg:rotate-0"
            />
            <Evolution evolution={nextEvolution} />
          </Fragment>
        ))}
    </div>
  );
};

const EvolutionSentence = ({
  evolutionChain,
}: {
  evolutionChain: PokemonEvolutionChain | null;
}) => {
  if (!evolutionChain || evolutionChain.chain.evolves_to.length === 0) {
    return <p>No evolutions available for this pokemon.</p>;
  }

  const generateEvolutionSentence = (
    evolutionChain: EvolutionChain,
    sentences: JSX.Element[] = [],
  ) => {
    if (evolutionChain.evolves_to.length > 0) {
      evolutionChain.evolves_to.forEach((evolution) => {
        const fromName = fixWordCasing(evolutionChain.species.name);
        const toName = fixWordCasing(evolution.species.name);
        sentences.push(
          <span key={fromName}>
            <span className="text-primary dark:text-secondary">{fromName}</span>{" "}
            evolves into{" "}
            <span className="text-primary dark:text-secondary">{toName}</span>
            {evolution.evolves_to.length > 0 ? ", " : "."}
          </span>,
        );
        generateEvolutionSentence(evolution, sentences);
      });
    }
    return sentences;
  };

  const evolutionSentences = generateEvolutionSentence(evolutionChain.chain);

  return (
    <p>
      {evolutionSentences.map((sentence, index) => (
        <Fragment key={index}>{sentence}</Fragment>
      ))}
    </p>
  );
};
