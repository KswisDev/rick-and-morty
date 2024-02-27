import { CharacterClient, Character } from "./CharacterClient";

export class CharacterClientHttp implements CharacterClient {
  constructor(private readonly baseUrl: string) {}

  async get(characterName?: string): Promise<Array<Character>> {
    const characters = await fetch(
      `${this.baseUrl}${characterName ? `?name=${characterName}` : ""}`,
      { method: "GET" }
    ).then((response) => response.json());

    return Promise.resolve(characters);
  }
}
