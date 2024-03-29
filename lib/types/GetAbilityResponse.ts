interface LanguageUrl {
  name: string;
  url: string;
}

interface EffectEntry {
  effect: string;
  language: LanguageUrl;
  short_effect: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: LanguageUrl;
  version_group: {
    name: string;
    url: string;
  };
}

interface Generation {
  name: string;
  url: string;
}

interface Name {
  language: LanguageUrl;
  name: string;
}

interface PokemonEntry {
  is_hidden: boolean;
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface GetAbilityResponse {
  effect_changes: any[]; // Can be detailed based on specific structure or needs
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  is_main_series: boolean;
  name: string;
  names: Name[];
  pokemon: PokemonEntry[];
}
