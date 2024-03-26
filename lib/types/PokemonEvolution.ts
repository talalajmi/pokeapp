interface EvolutionDetail {
  item: null | {
    name: string;
    url: string;
  };
  trigger: {
    name: string;
    url: string;
  };
  gender: null;
  held_item: null;
  known_move: null;
  known_move_type: null;
  location: null;
  min_level: number | null;
  min_happiness: null;
  min_beauty: null;
  min_affection: null;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: string;
  trade_species: null;
  turn_upside_down: boolean;
}

interface Species {
  name: string;
  url: string;
}

interface EvolutionNode {
  is_baby: boolean;
  species: Species;
  evolution_details: EvolutionDetail[] | null;
  evolves_to: EvolutionNode[]; // Recursive type for further evolutions
}

export interface PokemonEvolution {
  id: number;
  baby_trigger_item: null; // Can be expanded to a specific type if needed
  chain: EvolutionNode;
}
