import React from "react";
import { Character } from "CharacterClient";

type Props = {
  character: Character;
};

const CharacterCard = ({ character }: Props) => {
  return (
    <div className="mr-4 mb-4 border-2 border-gray-600 text-center">
      <h2>{character.name}</h2>
      <img src={character.image} alt={`picture of ${character.image}`} />

      {/* KJS could loop through properties instead here */}
      <div>
        <span className="font-bold">Status:</span> {character.status}
      </div>
      <div>
        <span className="font-bold">Species:</span> {character.species}
      </div>
    </div>
  );
};

export default CharacterCard;
