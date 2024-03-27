interface EvolutionTrigger {
  name: string;
  url: string;
}

interface EvolutionDetail {
  gender: null;
  held_item: null;
  item: {
    name: string;
    url: string;
  } | null;
  known_move: null;
  known_move_type: null;
  location: null;
  min_affection: null;
  min_beauty: null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: string;
  trade_species: null;
  trigger: EvolutionTrigger;
  turn_upside_down: boolean;
}

interface EvolutionNode {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionNode[]; // Recursive structure for further evolutions
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonEvolutionChain {
  baby_trigger_item: null; // Can be expanded to a specific type if needed
  chain: EvolutionNode;
  id: number;
}
