"use client";

import { fixWordCasing } from "@/lib/helpers";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import usePokeApi from "@/lib/hooks/usePokeApi";
import pokemonEndpoints from "@/lib/services/api";
import {
  GetTypesResponse,
  GetAbilitiesResponse,
  GetAbilityResponse,
  GetTypeResponse,
} from "@/lib/types";
import axios, { AxiosResponse } from "axios";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";

const pokemonfilterSchema = z.object({
  type: z.string().optional(),
  ability: z.string().optional(),
});

const defaultValues = {
  type: undefined,
  ability: undefined,
};

interface PokemonFiltersFormProps {
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredPokemons: React.Dispatch<React.SetStateAction<any[]>>;
  setIsLoadingFilteredPokemons: React.Dispatch<React.SetStateAction<boolean>>;
}

const PokemonFiltersForm = (props: PokemonFiltersFormProps) => {
  // ** Props
  const { setIsFiltered, setFilteredPokemons, setIsLoadingFilteredPokemons } =
    props;

  // ** Hooks
  const { data: types, isLoading: isLoadingTypes } =
    usePokeApi<GetTypesResponse>(pokemonEndpoints.getTypes);
  const { data: abilities, isLoading: isLoadingAbilities } =
    usePokeApi<GetAbilitiesResponse>(pokemonEndpoints.getAbilities);

  const form = useForm<z.infer<typeof pokemonfilterSchema>>({
    resolver: zodResolver(pokemonfilterSchema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof pokemonfilterSchema>) => {
    console.log("running");
    setIsFiltered(true);
    setIsLoadingFilteredPokemons(true);
    if (data.type && data.ability) {
      try {
        const pokemonsByTypeReponse: AxiosResponse<GetTypeResponse> =
          await axios.get(`https://pokeapi.co/api/v2/type/${data.type}`);
        const pokemonsByAbilityReponse: AxiosResponse<GetAbilityResponse> =
          await axios.get(`https://pokeapi.co/api/v2/ability/${data.ability}`);

        setFilteredPokemons(
          pokemonsByTypeReponse.data.pokemon
            .map((p) => p.pokemon)
            .filter((p) =>
              pokemonsByAbilityReponse.data.pokemon
                .map((p) => p.pokemon)
                .some((a) => a.name === p.name),
            ),
        );
        setIsLoadingFilteredPokemons(false);
      } catch (error) {
        console.error(error);
        setIsLoadingFilteredPokemons(false);
      }
    } else if (data.type) {
      try {
        const pokemonsByTypeReponse: AxiosResponse<GetTypeResponse> =
          await axios.get(`https://pokeapi.co/api/v2/type/${data.type}`);
        setFilteredPokemons(
          pokemonsByTypeReponse.data.pokemon.map((p) => p.pokemon),
        );
        setIsLoadingFilteredPokemons(false);
      } catch (error) {
        console.error(error);
        setIsLoadingFilteredPokemons(false);
      }
    } else if (data.ability) {
      try {
        const pokemonsByAbilityReponse: AxiosResponse<GetAbilityResponse> =
          await axios.get(`https://pokeapi.co/api/v2/ability/${data.ability}`);
        setFilteredPokemons(
          pokemonsByAbilityReponse.data.pokemon.map((p) => p.pokemon),
        );
        setIsLoadingFilteredPokemons(false);
      } catch (error) {
        console.error(error);
        setIsLoadingFilteredPokemons(false);
      }
    }

    setIsLoadingFilteredPokemons(false);
    return;
  };

  return (
    <Card className="top-32 h-fit flex-1 p-5 xl:sticky">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex-col gap-5 space-y-5">
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Type</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            Type
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search type..."
                            className="h-9"
                          />
                          {types && types.results.length !== 0 ? (
                            types.results
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((type) => (
                                <CommandItem
                                  key={type.name}
                                  value={type.name}
                                  className="dark:hover:bg-card"
                                >
                                  {fixWordCasing(type.name)}
                                </CommandItem>
                              ))
                          ) : (
                            <CommandEmpty>No data available</CommandEmpty>
                          )}
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                name="type"
                control={form.control}
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <Select defaultValue={value} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-background">
                        {types ? (
                          types.results.length !== 0 ? (
                            types.results
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((type) => (
                                <SelectItem
                                  key={type.name}
                                  value={type.name}
                                  className="dark:hover:bg-card"
                                >
                                  {fixWordCasing(type.name)}
                                </SelectItem>
                              ))
                          ) : (
                            <SelectItem
                              value="no-data"
                              className="dark:hover:bg-card"
                            >
                              No data available
                            </SelectItem>
                          )
                        ) : isLoadingTypes ? (
                          <SelectItem
                            value="loading"
                            className="dark:hover:bg-card"
                          >
                            Loading...
                          </SelectItem>
                        ) : (
                          <SelectItem
                            value="error"
                            className="dark:hover:bg-card"
                          >
                            Error fetching data
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                name="ability"
                control={form.control}
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <Select value={value} onValueChange={onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ability" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-background">
                        {abilities ? (
                          abilities.results.length !== 0 ? (
                            abilities.results
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((type) => (
                                <SelectItem
                                  key={type.name}
                                  value={type.name}
                                  className="dark:hover:bg-card"
                                >
                                  {fixWordCasing(type.name)}
                                </SelectItem>
                              ))
                          ) : (
                            <SelectItem
                              value="no-data"
                              className="dark:hover:bg-card"
                            >
                              No data available
                            </SelectItem>
                          )
                        ) : isLoadingAbilities ? (
                          <SelectItem
                            value="loading"
                            className="dark:hover:bg-card"
                          >
                            Loading...
                          </SelectItem>
                        ) : (
                          <SelectItem
                            value="error"
                            className="dark:hover:bg-card"
                          >
                            Error fetching data
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md-flex-row flex flex-col gap-5">
              <Button
                type="submit"
                className="xl: w-full border border-primary bg-primary text-secondary transition duration-300 ease-in-out hover:bg-primary-dark active:scale-95 dark:bg-secondary dark:text-primary dark:hover:bg-yellow-500"
              >
                Apply
              </Button>
              <Button
                onClick={() => {
                  console.log("resetting");
                  setIsFiltered(false);
                  setFilteredPokemons([]);
                  form.reset();
                }}
                className="xl: w-full border border-primary bg-secondary text-primary transition duration-300 ease-in-out hover:bg-secondary-dark active:scale-95 dark:bg-primary dark:text-secondary"
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default PokemonFiltersForm;
