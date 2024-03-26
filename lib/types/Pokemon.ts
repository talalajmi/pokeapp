interface AbilityDetail {
  name: string;
  url: string;
}

interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: AbilityDetail;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface ItemDetail {
  name: string;
  url: string;
}

interface HeldItemVersionDetail {
  rarity: number;
  version: {
    name: string;
    url: string;
  };
}

interface HeldItem {
  item: ItemDetail;
  version_details: HeldItemVersionDetail[];
}

interface MoveDetail {
  name: string;
  url: string;
}

interface MoveLearnMethod {
  name: string;
  url: string;
}

interface VersionGroup {
  name: string;
  url: string;
}

interface MoveVersionGroupDetail {
  level_learned_at: number;
  version_group: VersionGroup;
  move_learn_method: MoveLearnMethod;
}

interface Move {
  move: MoveDetail;
  version_group_details: MoveVersionGroupDetail[];
}

interface Species {
  name: string;
  url: string;
}

interface SpriteVersions {}

interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    [key: string]: any;
  };
  versions: SpriteVersions;
}

interface StatDetail {
  name: string;
  url: string;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: StatDetail;
}

interface TypeDetail {
  name: string;
  url: string;
}

interface Type {
  slot: number;
  type: TypeDetail;
}

interface PastType {
  generation: {
    name: string;
    url: string;
  };
  types: Type[];
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
  cries: {
    latest: string;
    legacy: string;
  };
}
