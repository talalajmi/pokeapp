// ** Form Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** Component Imports
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormField, FormItem, FormMessage, Form } from "./ui/form";

// ** Icon Imports
import { Icon } from "@iconify/react";

// ** Custom Hooks
import { PokemonService } from "@/lib/services";
import { Pokemon } from "@/lib/types";
import toast from "react-hot-toast";

const defaultValues = {
  query: "",
};

const searchSchema = z.object({
  query: z
    .string()
    .min(1, { message: "Search query must be at least 1 character" })
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Search query can only contain alphabets",
    }),
});

interface SearchPokemonsProps {
  isSearched: boolean;
  setIsSearched: (value: boolean) => void;
  setSearchedPokemon: (value: Pokemon | null) => void;
  setIsLoadingSearchedPokemon: (value: boolean) => void;
}

export const SearchPokemons = (props: SearchPokemonsProps) => {
  // ** Props
  const {
    isSearched,
    setIsSearched,
    setSearchedPokemon,
    setIsLoadingSearchedPokemon,
  } = props;

  const form = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = async (data: z.infer<typeof searchSchema>) => {
    setIsSearched(true);
    setIsLoadingSearchedPokemon(true);
    const pokemon = await new PokemonService().getPokemon(
      data.query.toLowerCase(),
    );
    if (!pokemon) {
      toast.error("No Pokémon found with that name");
      setIsLoadingSearchedPokemon(false);
      return;
    }
    setSearchedPokemon(pokemon);
    setIsLoadingSearchedPokemon(false);
  };

  const resetSearch = () => {
    form.reset(defaultValues);
    setIsSearched(false);
    setSearchedPokemon(null);
  };

  return (
    <Card className="w-full p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="query"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="default-transition group relative flex flex-col items-center gap-4 rounded-lg xl:flex-row ">
                  <div className="flex w-full items-center gap-5">
                    <Icon
                      fontSize={30}
                      icon="bx:bx-search"
                      className="default-transition text-gray-400 group-hover:text-black dark:group-hover:text-white"
                    />
                    <Input
                      {...field}
                      placeholder="Search for a Pokémon by name"
                      className="border-none bg-transparent text-gray-400 shadow-none ease-in-out placeholder:transition placeholder:duration-300 focus:text-black focus-visible:ring-0 group-hover:placeholder:translate-x-1 dark:focus:text-white"
                    />
                  </div>
                  <Button className="default-transition w-full border border-primary bg-yellow-400 text-primary hover:bg-yellow-500  active:scale-95 xl:w-fit">
                    Search
                  </Button>
                  {isSearched && (
                    <Button
                      onClick={resetSearch}
                      className="default-transition w-full border border-secondary bg-primary text-secondary hover:bg-primary-dark  active:scale-95 xl:w-fit"
                    >
                      Reset
                    </Button>
                  )}
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  );
};
