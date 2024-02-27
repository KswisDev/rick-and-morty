import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { Character, CharacterClient } from "../CharacterClient";

describe("App", () => {
  it(`User can search and view character`, async () => {
    const characters: Array<Character> = [
      {
        id: 1,
        name: "Rick",
        status: "alive",
        species: "human",
        image: "url/to/image/Rick",
      },
      {
        id: 2,
        name: "Morty",
        status: "alive",
        species: "human",
        image: "url/to/image/Morty",
      },
    ];

    const characterClient: CharacterClient = {
      get: async (searchStr) => {
        return {
          results: characters.filter((c) => c.name.includes(searchStr)),
        };
      },
    };

    render(<App characterClient={characterClient} />);

    expect(screen.queryByText("Rick")).not.toBeInTheDocument();
    expect(screen.queryByText("alive")).not.toBeInTheDocument();
    expect(screen.queryByText("human")).not.toBeInTheDocument();

    await userEvent.type(screen.getByRole("textbox"), "Rick");

    await waitFor(() => {
      expect(screen.queryByText("Rick")).toBeInTheDocument();
      expect(screen.queryByText("alive")).toBeInTheDocument();
      expect(screen.queryByText("human")).toBeInTheDocument();
    });
  });
});
