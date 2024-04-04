import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "./ui/select";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { fixWordCasing } from "@/lib/helpers";
import usePokeApi from "@/lib/hooks/usePokeApi";
import { pokemonEndpoints } from "@/lib/services";
import { GetAbilitiesResponse, GetTypesResponse, Pokemon } from "@/lib/types";

const PokemonFilters = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const { data: types } = usePokeApi<GetTypesResponse>(
    pokemonEndpoints.getTypes,
  );
  const { data: abilities } = usePokeApi<GetAbilitiesResponse>(
    pokemonEndpoints.getAbilities,
  );

  return (
    <Card className="top-32 h-fit flex-1 p-5 xl:sticky">
      <form>
        <div className="flex-col gap-5 space-y-5">
          <div className="flex flex-col gap-5">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="dark:bg-background">
                {types
                  ? types.results.map((type) => (
                      <SelectItem
                        key={type.name}
                        value={type.name}
                        className="dark:hover:bg-card"
                      >
                        {fixWordCasing(type.name)}
                      </SelectItem>
                    ))
                  : null}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Ability" />
              </SelectTrigger>
              <SelectContent className="dark:bg-background">
                {abilities
                  ? abilities.results.map((ability) => (
                      <SelectItem
                        key={ability.name}
                        value={ability.name}
                        className="dark:hover:bg-card"
                      >
                        {fixWordCasing(ability.name)}
                      </SelectItem>
                    ))
                  : null}
                <SelectItem className="dark:hover:bg-card" value="fetch-more">
                  Fetch More Abilities
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md-flex-row flex flex-col gap-5">
            <Button
              type="submit"
              className="border border-primary bg-primary text-secondary transition duration-300 ease-in-out hover:bg-primary-dark active:scale-95 dark:bg-secondary dark:text-primary dark:hover:bg-yellow-500"
            >
              Apply
            </Button>
            <Button className="border border-secondary bg-secondary text-primary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95 dark:bg-primary dark:text-secondary">
              Reset
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default PokemonFilters;
