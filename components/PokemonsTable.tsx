import { BasicPokemonData, columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetPokemons } from "@/lib/hooks";

export default function PokemonsTable() {
  const { data: pokemons } = useGetPokemons();

  if (!pokemons) return <div>No</div>;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={[]} />
    </div>
  );
}
