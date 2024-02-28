import { render } from "@testing-library/react";
import React from "react";
import CharacterCard from "../characterCard";

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

  it("renders loading as expected", async () => {
    expect(render(<CharacterCard />)).toMatchSnapshot();
  });
});
