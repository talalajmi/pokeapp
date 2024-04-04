interface EncounterMethod {
  name: string;
  url: string;
}

interface ConditionValue {
  name: string;
  url: string;
}

interface EncounterDetail {
  chance: number;
  condition_values: ConditionValue[];
  max_level: number;
  method: EncounterMethod;
  min_level: number;
}

interface Version {
  name: string;
  url: string;
}

interface VersionDetail {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version;
}

interface LocationArea {
  name: string;
  url: string;
}

export interface PokemonEncounter {
  location_area: LocationArea;
  version_details: VersionDetail[];
}
