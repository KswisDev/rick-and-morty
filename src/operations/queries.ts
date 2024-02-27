export const searchCharacters = async (characterName?: string) => {
  const characters = await fetch(
    `https://rickandmortyapi.com/api/character${
      characterName ? `?name=${characterName}` : ""
    }`
  );

  return characters.json();
};
