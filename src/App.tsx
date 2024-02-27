import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharacterSearch from "./CharacterSearch";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CharacterSearch />
    </QueryClientProvider>
  );
};

export default App;
