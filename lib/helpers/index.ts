export const getColorByType = (typeName: string) => {
  const typeColors: { [key: string]: string } = {
    grass: "bg-green-500 text-white",
    fire: "bg-red-500 text-white",
    water: "bg-blue-500 text-white",
    bug: "bg-green-500 text-white",
    normal: "bg-gray-500 text-white",
    poison: "bg-purple-500 text-white",
    electric: "bg-yellow-500 text-white",
    ground: "bg-yellow-800 text-white",
    fairy: "bg-pink-500 text-white",
    fighting: "bg-red-800 text-white",
    psychic: "bg-pink-800 text-white",
    rock: "bg-gray-800 text-white",
    ghost: "bg-indigo-800 text-white",
    ice: "bg-blue-800 text-white",
    dragon: "bg-red-800 text-white",
    dark: "bg-gray-800 text-white",
    steel: "bg-gray-500 text-white",
  };

  return typeColors[typeName] || "bg-gray-500 text-white";
};

export const fixWordCasing = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
