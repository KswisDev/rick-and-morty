import React from "react";
import Skeleton from "react-loading-skeleton";
import { Character } from "../types";

type Props = {
  character?: Character;
};

const CharacterCard = ({ character }: Props) => {
  return (
    <div className="mr-4 mb-4 border-2 border-gray-600 text-center">
      <h2>{character?.name || <Skeleton />}</h2>
      {character?.image ? (
        <img
          src={character?.image}
          alt={`picture of ${character.image}`}
          width={300}
          height={300}
        />
      ) : (
        <div className="w-[300px] h-[300px]">
          <Skeleton height="100%" />
        </div>
      )}

      {/* KJS could loop through properties instead here */}
      {/** todo: grid?, add modal for more info?, hook tests, fix module exports */}
      <div>
        <span className="font-bold">Status:</span>{" "}
        {character?.status || <Skeleton width="50%" />}
      </div>
      <div>
        <span className="font-bold">Species:</span>{" "}
        {character?.species || <Skeleton width="50%" />}
      </div>
    </div>
  );
};

export default CharacterCard;
