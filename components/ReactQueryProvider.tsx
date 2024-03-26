"use client";

// ** React Imports
import React from "react";

// ** React Query Imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ** Types
interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  // ** This is where we will initialize React Query
  const queryClient = new QueryClient({});

  // ** Return the QueryClientProvider with the queryClient as the client, to be able to use React Query throughout our app
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
