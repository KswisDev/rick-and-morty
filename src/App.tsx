import React, { useCallback, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CharacterCard from "./components/character-card";
import { Character, CharacterClient } from "CharacterClient";

type Props = {
  characterClient: CharacterClient;
};

const App = ({ characterClient: characterClient }: Props) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchName, setSearchName] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // KJS error boundry or react query
  const getCharacters = useCallback(async () => {
    const returnedCharacters = await characterClient.get(searchName);
    setCharacters(returnedCharacters.results);
    setIsLoading(false);
  }, [searchName]);

  useEffect(() => {
    getCharacters();
  }, [getCharacters, searchName]);

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
      {isLoading ? (
        <div className="flex justify-center">
          {" "}
          <ClipLoader />{" "}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {characters &&
            characters.map((c) => {
              return <CharacterCard character={c} key={c.id} />;
            })}
        </div>
      )}
    </div>
  );
};

export default App;
