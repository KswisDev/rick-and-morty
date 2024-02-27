import * as React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { CharacterClientHttp } from "./CharacterClientHttp";

const characterClient = new CharacterClientHttp(
  "https://rickandmortyapi.com/api/character"
);

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<App characterClient={characterClient} />);
