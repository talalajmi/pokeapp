// ** Form Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** Component Imports
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormField, FormItem, FormMessage, Form } from "./ui/form";

// ** React Imports
import { useState } from "react";

// ** Icon Imports
import { Icon } from "@iconify/react";

// ** Custom Hooks
import { useGetSearchedPokemon } from "@/lib/hooks";

const defaultValues = {
  query: "",
};

const searchSchema = z.object({
  query: z.string().min(1, { message: "Query must be at least 1 character" }),
});

interface SearchPokemonsProps {
  isSearched: boolean;
  setIsSearched: (value: boolean) => void;
}

export const SearchPokemons = (props: SearchPokemonsProps) => {
  // ** Props
  const { isSearched, setIsSearched } = props;

  const [query, setQuery] = useState<string | undefined>(undefined);

  const { data: pokemon, isLoading } = useGetSearchedPokemon(query);

  const form = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: z.infer<typeof searchSchema>) => {
    setIsSearched(true);
    console.log(data.query);
    setQuery(data.query.toLowerCase());
  };

  const resetSearch = () => {
    form.reset(defaultValues);
    setIsSearched(false);
    setQuery(undefined);
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
                <div className="group relative flex flex-col items-center gap-4 rounded-lg transition duration-300 ease-in-out xl:flex-row ">
                  <div className="flex w-full items-center gap-5">
                    <Icon
                      fontSize={30}
                      icon="bx:bx-search"
                      className="text-gray-400 transition duration-300 ease-in-out group-hover:text-black dark:group-hover:text-white"
                    />
                    <Input
                      {...field}
                      placeholder="Search for a Pokémon by either name or number"
                      className="border-none bg-transparent text-gray-400 shadow-none ease-in-out placeholder:transition placeholder:duration-300 focus:text-black focus-visible:ring-0 group-hover:placeholder:translate-x-1 dark:focus:text-white"
                    />
                  </div>
                  <Button className="w-full border border-primary bg-yellow-400 text-primary transition duration-300 ease-in-out hover:bg-yellow-500  active:scale-95 xl:w-fit">
                    Search
                  </Button>
                  {isSearched && (
                    <Button
                      onClick={resetSearch}
                      className="w-full border border-primary bg-red-500 text-white transition duration-300 ease-in-out hover:bg-red-600  active:scale-95 active:bg-red-700 xl:w-fit"
                    >
                      Reset
                    </Button>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  );
};
