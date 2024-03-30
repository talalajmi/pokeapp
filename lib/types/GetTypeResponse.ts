interface TypeReference {
  name: string;
  url: string;
}

interface DamageRelations {
  double_damage_from: TypeReference[];
  double_damage_to: TypeReference[];
  half_damage_from: TypeReference[];
  half_damage_to: TypeReference[];
  no_damage_from: TypeReference[];
  no_damage_to: TypeReference[];
}

interface GameIndex {
  game_index: number;
  generation: TypeReference;
}

interface Move {
  name: string;
  url: string;
}

interface PokemonEntry {
  pokemon: TypeReference;
  slot: number;
}

interface PokemonTypeName {
  language: TypeReference;
  name: string;
}

export interface GetTypeResponse {
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: TypeReference;
  id: number;
  move_damage_class: TypeReference;
  moves: Move[];
  name: string;
  names: PokemonTypeName[];
  past_damage_relations: any[];
  pokemon: PokemonEntry[];
}
