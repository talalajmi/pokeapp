"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BasicPokemonData = {
  name: string;
  url: number;
};

export const columns: ColumnDef<BasicPokemonData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "url",
    header: "Url",
  },
];
