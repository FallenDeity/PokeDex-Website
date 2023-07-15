"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Pokemon, PokemonClient } from "pokenode-ts";
import React from "react";

import PokemonCard from "@/components/PokemonCard";
import useUserLikedMons from "@/lib/hooks/getUserLikedMons";
import { UserSession } from "@/lib/models";

export default function FavoritesContainer(): React.JSX.Element {
	const { data: session } = useSession() as { data: UserSession | undefined };
	const router = useRouter();
	const likedPokemon = useUserLikedMons();
	const [pokemonData, setPokemonData] = React.useState<Map<number, Pokemon>>(new Map());
	React.useEffect(() => {
		if (likedPokemon.length === 0) return;
		// eslint-disable-next-line @typescript-eslint/require-await
		async function getPokemonData(): Promise<void> {
			const api = new PokemonClient();
			for (const pokemon of likedPokemon) {
				try {
					const _pokemon = await api.getPokemonById(pokemon);
					setPokemonData((prev) => new Map(prev.set(_pokemon.id, _pokemon)));
				} catch (e) {
					console.log(e);
				}
			}
		}
		void getPokemonData();
	}, [likedPokemon, session]);
	return (
		<div className="flex h-full w-full flex-col items-center border-x bg-gray-500 bg-opacity-20 backdrop-blur-sm backdrop-filter dark:bg-gray-800 dark:bg-opacity-20">
			<div className="flex h-[80vh] flex-wrap justify-center overflow-y-scroll scrollbar-hide">
				{!session && (
					<div className="flex h-full w-full flex-col items-center justify-center">
						<h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
							Login to see your favorites!
						</h1>
						<button
							type="button"
							className="mt-4 rounded-md bg-gray-200 px-4 py-2 text-gray-800 shadow-md transition duration-300 ease-in-out hover:bg-gray-300 hover:ring-2 hover:ring-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
							onClick={(): void => router.push("/login")}>
							Login
						</button>
					</div>
				)}
				{Boolean(pokemonData.size) &&
					Array.from(pokemonData.values())
						.sort((a, b) => a.id - b.id)
						.map((pokemon) => <PokemonCard pokemon={pokemon} key={pokemon.name} />)}
			</div>
		</div>
	);
}
