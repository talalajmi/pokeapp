
# Next.js Pokémon App

This is a simple Pokémon application built with Next.js, showcasing how to fetch and display data from the [PokeAPI](https://pokeapi.co).

## Getting Started

### Prerequisites

Before you begin, ensure you have Node.js installed on your system. This project supports Node.js versions 12.x, 14.x, and newer. You can download Node.js from [here](https://nodejs.org/).

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/talalajmi/pokeapp.git
   cd pokeapp
   ```

2. Install dependencies:

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

   Using bun:

   ```bash
   bun install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory of your project. Add the following line to it:

   ```
   NEXT_PUBLIC_POKEAPI_URL=https://pokeapi.co/api/v2
   ```

   This file will not be included in your source control (it's listed in `.gitignore` by default) to keep your environment variables secure.

### Running the Application

- **Development Mode**:

  To run the application in development mode with hot reloading:

  Using npm:

  ```bash
  npm run dev
  ```

  Using yarn:

  ```bash
  yarn dev
  ```

  Using bun:

  ```bash
  bun dev
  ```

  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Production Mode**:

  To build and run the application in production mode:

  1. Build the application:

     Using npm:

     ```bash
     npm run build
     ```

     Using yarn:

     ```bash
     yarn build
     ```

     Using bun:

     ```bash
     bun run build
     ```

  2. Start the application:

     Using npm:

     ```bash
     npm start
     ```

     Using yarn:

     ```bash
     yarn start
     ```

     Using bun:

     ```bash
     bun start
     ```


## Deployed App Link

https://pokeapp-omega-dun.vercel.app/
