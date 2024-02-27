import { render } from "@testing-library/react";
import React from "react";
import CharacterCard from "../character-card";

describe("CharacterCard", () => {
  it("renders as expected", async () => {
    expect(
      render(
        <CharacterCard
          character={{
            name: "Rick",
            id: 1,
            image: "url",
            species: "human",
            status: "alive",
          }}
        />
      )
    ).toMatchSnapshot();
  });
});
