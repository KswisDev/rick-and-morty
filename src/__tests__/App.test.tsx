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
      error: null,
      characters: null,
    });

    render(<App />);

    expect(screen.queryByText("No Characters found")).toBeInTheDocument();
    expect(screen.queryByText("Rick")).not.toBeInTheDocument();
    expect(screen.queryByText("alive")).not.toBeInTheDocument();
    expect(screen.queryByText("human")).not.toBeInTheDocument();

    useCharactersMock.mockReturnValue({
      isLoading: false,
      error: null,
      characters,
    });

    await userEvent.type(screen.getByRole("textbox"), "Rick");

    await waitFor(() => {
      expect(screen.queryByText("No Characters found")).not.toBeInTheDocument();
      expect(screen.queryByText("Rick")).toBeInTheDocument();
      expect(screen.queryByText("alive")).toBeInTheDocument();
      expect(screen.queryByText("human")).toBeInTheDocument();
    });
  });

  it(`Error is displayed when error returned from hook`, async () => {
    useCharactersMock.mockReturnValue({
      isLoading: false,
      error: { message: "error" },
      characters: null,
    });

    render(<App />);

    expect(screen.queryByText("An error has occured")).toBeInTheDocument();
  });

  it(`Renders loading state when hook returns isLoading`, async () => {
    useCharactersMock.mockReturnValue({
      isLoading: true,
      error: null,
      characters: null,
    });

    expect(render(<App />)).toMatchSnapshot();
  });
});
