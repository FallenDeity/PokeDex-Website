import { atom } from "recoil";

type PageOptions = "Description" | "Encounter Areas" | "Evolutions" | "Moves";

export const pokemonPage = atom({
	key: "pokemonPage",
	default: "Description" as PageOptions,
});
