import React, { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import CharacterCard from "./components/character-card";
import { useCharacters } from "./hooks/useCharacters";

const CharacterSearch = () => {
  const [searchName, setSearchName] = useState("");
  const debouncedSearchName = useDebounce(searchName, 300);
  const { isLoading, error, characters } = useCharacters(debouncedSearchName);

  const handleInput = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center mb-8">
        Rick and Morty
      </h1>
      <div className="text-center p-4">
        <input
          className="border border-gray-400"
          type="text"
          placeholder="Enter characters name..."
          value={searchName}
          onChange={handleInput}
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {error && <div>An error has occured</div>}
        {isLoading ? (
          <>
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
          </>
        ) : (
          <>
            {characters ? (
              characters.map((c) => {
                return <CharacterCard character={c} key={c.id} />;
              })
            ) : (
              <div> No Characters found </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterSearch;
