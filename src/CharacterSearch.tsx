import React, { useCallback, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useQuery } from "@tanstack/react-query";
import CharacterCard from "./components/character-card";
import { Character } from "CharacterClient";
import { searchCharacters } from "./operations/queries";

const CharacterSearch = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchName, setSearchName] = useState(undefined);

  const { data, isLoading, error } = useQuery({
    queryKey: ["characterSearch", searchName],
    queryFn: () => searchCharacters(searchName),
  });

  const getCharacters = useCallback(async () => {
    setCharacters(data?.results);
  }, [searchName, data]);

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
      {error && <div>An error has occured</div>}
      {isLoading ? (
        <div className="flex justify-center">
          {" "}
          <ClipLoader />{" "}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {characters ? (
            characters.map((c) => {
              return <CharacterCard character={c} key={c.id} />;
            })
          ) : (
            <div> No Characters found </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
