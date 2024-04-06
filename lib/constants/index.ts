export const routes = {
  home: "/",
  pokedex: "/pokedex",
  about: "/about",
  pokemon: (pokemonId: string | number) => `/pokemon/${pokemonId}`,
};

export const navbarLinks = [
  { label: "Home", route: routes.home },
  { label: "Pokédex", route: routes.pokedex },
  { label: "About", route: routes.about },
];

export const themes = [
  { value: "dark", label: "Dark", icon: "material-symbols:dark-mode" },
  { value: "light", label: "Light", icon: "material-symbols:light-mode" },
  {
    value: "system",
    label: "System",
    icon: "material-symbols:computer-outline",
  },
];
