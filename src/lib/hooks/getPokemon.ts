"use client";

import { PokemonClient } from "pokenode-ts"; // import the PokemonClient
import React from "react";

export default function usePokemon(): string[] {
	const [pokemon, setPokemon] = React.useState<string[]>([]);
	React.useEffect(() => {
		async function getPokemon(): Promise<void> {
			const api = new PokemonClient();
			const pokemon = await api.listPokemons(0, 100_000);
			setPokemon(pokemon.results.map((pokemon) => pokemon.name));
		}
		void getPokemon();
	}, []);
	return pokemon;
}
