export const getColorByType = (typeName: string) => {
  const typeColors: { [key: string]: string } = {
    grass: "bg-green-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    bug: "bg-green-500",
    normal: "bg-gray-500",
    poison: "bg-purple-500",
    electric: "bg-yellow-500",
    ground: "bg-yellow-800",
    fairy: "bg-pink-500",
    fighting: "bg-red-800",
    psychic: "bg-pink-800",
    rock: "bg-gray-800",
    ghost: "bg-indigo-800",
    ice: "bg-blue-800",
    dragon: "bg-red-800",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
  };

  return typeColors[typeName] || "bg-gray-500";
};
