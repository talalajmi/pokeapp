import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getPokemonImageDreamWorld } from "@/lib/helpers";

const technologies = [
  {
    name: "Iconify",
    url: "https://iconify.design/",
  },
  {
    name: "Next.js",
    url: "https://nextjs.org/",
  },
  {
    name: "PokeAPI",
    url: "https://pokeapi.co/",
  },
  {
    name: "Shadcn UI",
    url: "https://ui.shadcn.com/",
  },
  {
    name: "TailwindCSS",
    url: "https://tailwindcss.com/",
  },
  {
    name: "React Hook Form",
    url: "https://react-hook-form.com/",
  },
  {
    name: "TanStack (React Query)",
    url: "https://tanstack.com/",
  },
];

const feautures = [
  "Dark mode",
  "View all Pokémon",
  "Responsive design",
  "Play Pokémon cries",
  "View Pokémon details",
  "Filter Pokémon by type",
  "Search for Pokémon by name",
];

const AboutPage = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-5 lg:flex-row">
        <Card className="w-full">
          <CardContent className="p-10">
            <div className="flex flex-col items-start justify-start gap-6">
              <Image
                width={150}
                height={150}
                alt="Pikachu"
                className="mx-auto"
                src={getPokemonImageDreamWorld(25)}
              />
              <h1 className="w-full text-center text-4xl text-primary dark:text-secondary">
                About
              </h1>
              <p className="text-justify text-lg">
                This Pokedex application is a comprehensive guide for all
                Pokemon enthusiasts. Built with the powerful Next.js framework
                and styled with the utility-first CSS library, TailwindCSS, it
                provides a sleek, responsive, and user-friendly interface. The
                application fetches data from the robust PokeAPI, a RESTful API
                that has data on every Pokemon across all generations. This
                includes details such as the Pokemon&apos;s abilities, stats,
                and types, making it a valuable resource for both casual fans
                and competitive players. This project is a significant milestone
                in my learning journey with Next.js and TailwindCSS. It allowed
                me to explore various aspects of these technologies, such as
                server-side rendering and responsive design, and apply them in a
                real-world context.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="flex flex-col justify-between gap-10 p-10">
            <Image
              width={200}
              height={200}
              alt="Next.js"
              className="mx-auto"
              src={getPokemonImageDreamWorld(72)}
            />
            <h1 className="w-full text-center text-3xl text-primary dark:text-secondary">
              Application Features and Technologies Used
            </h1>
            <div className="flex flex-col items-start justify-between gap-5 xl:flex-row xl:items-center">
              <div className="space-y-2">
                <h2 className="text-2xl text-primary dark:text-secondary">
                  Technologies Used
                </h2>
                <ul className="list-inside list-disc space-y-2">
                  {technologies.map((technology) => (
                    <li key={technology.name}>
                      <a
                        target="_blank"
                        href={technology.url}
                        rel="noopener noreferrer"
                        className="text-primary underline dark:text-secondary"
                      >
                        {technology.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl text-primary dark:text-secondary">
                  Features
                </h2>
                <ul className="list-inside list-disc space-y-2">
                  {feautures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-10">
          <div className="flex flex-col items-start justify-start gap-6">
            <Image
              width={150}
              height={150}
              alt="Pikachu"
              className="mx-auto"
              src={getPokemonImageDreamWorld(97)}
            />
            <h1 className="w-full text-center text-3xl text-primary dark:text-secondary">
              Contact
            </h1>
            <p className="text-justify text-lg">
              If you have any questions or feedback, feel free to reach out to
              me via the following platforms:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <a
                  target="_blank"
                  href="
                https://www.linkedin.com/in/talal-al-ajmi-43ba981a0/"
                  rel="noopener noreferrer"
                  className="text-primary underline dark:text-secondary"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="mailto:talalajmi98@gmail.com"
                  rel="noopener noreferrer"
                  className="text-primary underline dark:text-secondary"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
