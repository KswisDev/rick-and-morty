import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { Character } from "../types";
import { useCharacters } from "../hooks/useCharacters";

jest.mock("../hooks/useCharacters");

const useCharactersMock = useCharacters as jest.MockedFunction<
  typeof useCharacters
>;

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
    ];

    useCharactersMock.mockReturnValue({
      isLoading: false,
      error: false,
      characters: null,
    });

    render(<App />);

    expect(screen.queryByText("Rick")).not.toBeInTheDocument();
    expect(screen.queryByText("alive")).not.toBeInTheDocument();
    expect(screen.queryByText("human")).not.toBeInTheDocument();

    useCharactersMock.mockReturnValue({
      isLoading: false,
      error: false,
      characters,
    });

    await userEvent.type(screen.getByRole("textbox"), "Rick");

    await waitFor(() => {
      expect(screen.queryByText("Rick")).toBeInTheDocument();
      expect(screen.queryByText("alive")).toBeInTheDocument();
      expect(screen.queryByText("human")).toBeInTheDocument();
    });
  });
});
