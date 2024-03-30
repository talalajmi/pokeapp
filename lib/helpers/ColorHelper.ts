export const getColorByType = (typeName: string) => {
  const color = {
    normal: "bg-gray-400",
    fighting: "bg-red-500",
    flying: "bg-blue-500",
    poison: "bg-purple-500",
    ground: "bg-yellow-500",
    rock: "bg-yellow-800",
    bug: "bg-green-500",
    ghost: "bg-indigo-500",
    steel: "bg-gray-500",
    fire: "bg-red-600",
    water: "bg-blue-600",
    grass: "bg-green-600",
    electric: "bg-yellow-600",
    psychic: "bg-pink-500",
    ice: "bg-blue-300",
    dragon: "bg-blue-800",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
  };

  return color[typeName as keyof typeof color] || "bg-gray-500";
};
