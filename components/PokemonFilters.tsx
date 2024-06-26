// ** React Imports
import { useForm } from "react-hook-form";

// ** Component Imports
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "./ui/select";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";

// ** Custom Hooks and Types
import usePokeApi from "@/lib/hooks/usePokeApi";
import { fixWordCasing } from "@/lib/helpers";
import {
  GetTypesResponse,
  NamedAPIResource,
  GetAbilitiesResponse,
} from "@/lib/types";

// ** Services
import { PokemonService, pokemonEndpoints } from "@/lib/services";

// ** Third Party Imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValues = {
  type: "",
  ability: "",
};

const pokemonFiltersSchema = z.object({
  type: z.string().optional(),
  ability: z.string().optional(),
});

interface PokemonFiltersProps {
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingFilteredPokemons: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredPokemons: React.Dispatch<React.SetStateAction<NamedAPIResource[]>>;
}

const PokemonFilters = (props: PokemonFiltersProps) => {
  // ** Props
  const { setFilteredPokemons, setIsFiltered, setIsLoadingFilteredPokemons } =
    props;

  // ** Hooks
  const { data: types } = usePokeApi<GetTypesResponse>(
    pokemonEndpoints.getTypes,
  );

  const { data: abilities } = usePokeApi<GetAbilitiesResponse>(
    pokemonEndpoints.getAbilities,
  );

  // ** React Hook Form
  const form = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: zodResolver(pokemonFiltersSchema),
  });

  // ** Functions
  const handleFiltersReset = () => {
    form.reset(defaultValues);
    setFilteredPokemons([]);
    setIsFiltered(false);
  };

  const filterPokemons = async (data: z.infer<typeof pokemonFiltersSchema>) => {
    setIsFiltered(true);
    setIsLoadingFilteredPokemons(true);
    if (data.type && data.type !== "") {
      const type = await new PokemonService().getType(data.type);

      if (!type) {
        setIsLoadingFilteredPokemons(false);
        return;
      }

      setFilteredPokemons(type.pokemon.map((pokemon) => pokemon.pokemon));
      setIsLoadingFilteredPokemons(false);
      return;
    }

    if (data.ability && data.ability !== "") {
      const ability = await new PokemonService().getAbility(data.ability);

      if (!ability) {
        setIsLoadingFilteredPokemons(false);
        return;
      }

      setFilteredPokemons(ability.pokemon.map((pokemon) => pokemon.pokemon));
      setIsLoadingFilteredPokemons(false);
      return;
    }

    if (data.type && data.ability) {
      const type = await new PokemonService().getType(data.type);

      if (!type) {
        setIsLoadingFilteredPokemons(false);
        return;
      }

      const ability = await new PokemonService().getAbility(data.ability);

      if (!ability) {
        setIsLoadingFilteredPokemons(false);
        return;
      }

      const typePokemons = type.pokemon.map((pokemon) => pokemon.pokemon);
      const abilityPokemons = ability.pokemon.map((pokemon) => pokemon.pokemon);

      const filteredPokemons = typePokemons.filter((typePokemon) =>
        abilityPokemons.some(
          (abilityPokemon) => typePokemon.name === abilityPokemon.name,
        ),
      );

      setFilteredPokemons(filteredPokemons);
      setIsLoadingFilteredPokemons(false);
      return;
    }

    if (!data.type && !data.ability) {
      setFilteredPokemons([]);
      setIsFiltered(false);
      setIsLoadingFilteredPokemons(false);
    }
  };

  return (
    <Card className="h-fit flex-1 p-5 xl:sticky xl:top-32">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(filterPokemons)}>
          <div className="flex-col gap-5 space-y-5">
            <div className="flex flex-col gap-5">
              <FormField
                name="type"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-background">
                        {types
                          ? types.results
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((type) => (
                                <SelectItem
                                  key={type.name}
                                  value={type.url.split("/")[6]}
                                  className="dark:hover:bg-card"
                                >
                                  {fixWordCasing(type.name)}
                                </SelectItem>
                              ))
                          : null}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="ability"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ability" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-background">
                        {abilities
                          ? abilities.results
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((ability) => (
                                <SelectItem
                                  key={ability.name}
                                  value={ability.url.split("/")[6]}
                                  className="dark:hover:bg-card"
                                >
                                  {fixWordCasing(ability.name)}
                                </SelectItem>
                              ))
                          : null}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md-flex-row flex flex-col gap-5">
              <Button type="submit" className="btn-secondary">
                Apply
              </Button>
              <Button onClick={handleFiltersReset} className="btn-primary">
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default PokemonFilters;
