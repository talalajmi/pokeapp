"use client";

// ** React Imports
import React from "react";

// ** React Query Imports
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// ** Types
interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  // ** This is where we will initialize React Query
  const queryClient = new QueryClient(
    // ** This is where we can pass in options for the QueryClient
    {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,

          // ** This is where we can set the default query options for all queries
          staleTime: 1000 * 60 * 5, // ** 5 minutes
        },
      },
    },
  );

  // ** Return the QueryClientProvider with the queryClient as the client, to be able to use React Query throughout our app
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
