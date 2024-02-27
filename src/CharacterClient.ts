export type UUID = string;

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};
export interface CharacterClient {
  get: (characterName?: string) => Promise<Array<Character>>;
}
