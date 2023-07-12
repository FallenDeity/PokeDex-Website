import { Pokemon } from "pokenode-ts";
import { atom } from "recoil";

interface CompareMons {
	mon_1?: Pokemon;
	mon_2?: Pokemon;
}

export const compareMons = atom({
	key: "compareMons",
	default: {} as CompareMons,
});
