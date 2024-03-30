import { Card, CardContent } from "@/components/ui/card";
import { getPokemonImageDreamWorld } from "@/lib/helpers";
import Image from "next/image";
import React from "react";

const AboutPage = () => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col items-start justify-start gap-6">
          <Image
            width={150}
            height={150}
            alt="Pikachu"
            className="mx-auto"
            src={getPokemonImageDreamWorld(25)}
          />
          <h1 className="w-full text-center text-4xl text-primary dark:text-secondary md:text-start">
            About
          </h1>
          <p className="text-justify text-lg">
            This Pokedex application is a comprehensive guide for all Pokemon
            enthusiasts. Built with the powerful Next.js framework and styled
            with the utility-first CSS library, TailwindCSS, it provides a
            sleek, responsive, and user-friendly interface. The application
            fetches data from the robust PokeAPI, a RESTful API that has data on
            every Pokemon across all generations. This includes details such as
            the Pokemon&apos;s abilities, stats, and types, making it a valuable
            resource for both casual fans and competitive players. This project
            is a significant milestone in my learning journey with Next.js and
            TailwindCSS. It allowed me to explore various aspects of these
            technologies, such as server-side rendering and responsive design,
            and apply them in a real-world context.
          </p>
          <p className="text-lg">
            The source code for this project can be found on{" "}
            <a
              className="text-primary underline dark:text-secondary"
              href="https://github.com/talalajmi/pokeapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
          <p className="text-justify text-lg">
            This project is open-source and contributions are welcome. Feel free
            to submit a pull request or open an issue on GitHub.
          </p>

          <h2 className="text-2xl text-primary dark:text-secondary">
            Technologies Used
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <a
                className="text-primary underline dark:text-secondary"
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </a>
            </li>
            <li>
              <a
                className="text-primary underline dark:text-secondary"
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                TailwindCSS
              </a>
            </li>
            <li>
              <a
                className="text-primary underline dark:text-secondary"
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PokeAPI
              </a>
            </li>
            <li>
              <a
                className="text-primary underline dark:text-secondary"
                href="https://tanstack.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                TanStack (React Query)
              </a>
            </li>
            <li>
              <a
                className="text-primary underline dark:text-secondary"
                href="https://react-hook-form.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Hook Form
              </a>
            </li>
            <li>
              <a
                className="text-primary underline dark:text-secondary"
                href="https://iconify.design/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Iconify
              </a>
            </li>
            <li>
              <a
                className="text-primary underline dark:text-secondary"
                href="https://ui.shadcn.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shadcn UI
              </a>
            </li>
          </ul>

          <h2 className="text-2xl text-primary dark:text-secondary">
            Features
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>View all Pokémon</li>
            <li>Search for Pokémon by name</li>
            <li>View Pokémon details</li>
            <li>Play Pokémon cries</li>
            <li>Filter Pokémon by type</li>
            <li>Dark mode</li>
            <li>Responsive design</li>
          </ul>

          <h2 className="text-2xl text-primary dark:text-secondary">Contact</h2>
          <p className="text-lg">
            You can reach me at{" "}
            <a
              className="text-primary underline dark:text-secondary"
              href="mailto:talalajmi98@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              talalajmi98@gmail.com
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutPage;
