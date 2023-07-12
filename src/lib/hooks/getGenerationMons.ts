"use client";

import { GameClient } from "pokenode-ts"; // import the PokemonClient
import React from "react";

export default function useGeneration(id: number): number[] {
	const [pokemon, setPokemon] = React.useState<number[]>([]);
	React.useEffect(() => {
		async function getPokemon(): Promise<void> {
			const api = new GameClient();
			const generation = await api.getGenerationById(id);
			const _mons = generation.pokemon_species.sort((a, b) => {
				const aNum = parseInt(a.url.split("/")[6]);
				const bNum = parseInt(b.url.split("/")[6]);
				return aNum - bNum;
			});
			setPokemon(_mons.map((pokemon) => Number(pokemon.url.split("/")[6])));
		}
		void getPokemon();
	}, [id]);
	return pokemon;
}
