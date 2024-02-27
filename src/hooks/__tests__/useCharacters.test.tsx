import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCharacters } from "../useCharacters";
import { searchCharacters } from "../../operations/queries";

jest.mock("../../operations/queries");

describe("useCharacters", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  const searchCharactersMock = searchCharacters as jest.Mock;
  const searchCharactersMockReturnValue = [
    {
      id: 1,
      name: "Rick",
      status: "alive",
      species: "human",
      image: "url/to/image/Rick",
    },
  ];
  it("renders as expected", async () => {
    searchCharactersMock.mockResolvedValue({
      results: searchCharactersMockReturnValue,
    });
    const { result } = renderHook(() => useCharacters("Rick"), { wrapper });

    expect(searchCharactersMock).toHaveBeenCalledWith("Rick");
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.characters).toEqual(
        searchCharactersMockReturnValue
      );
    });
  });
});
