"use client";

import { GameClient, Pokemon, PokemonClient } from "pokenode-ts";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import useGeneration from "@/lib/hooks/getGenerationMons";
import usePokemon from "@/lib/hooks/getPokemon";

import PokemonCard from "./PokemonCard";

export default function SearchContainer(): React.JSX.Element {
	const searchBarRef = React.useRef<HTMLInputElement>(null);
	const [generations, setGenerations] = React.useState<string[]>([]);
	const [generation, setGeneration] = React.useState(1);
	const generationList = useGeneration(generation);
	const pokemonList = usePokemon();
	const [searchData, setSearchData] = React.useState<Map<number, Pokemon>>(new Map());
	const [pokemonData, setPokemonData] = React.useState<Map<number, Pokemon>>(new Map());
	React.useEffect(() => {
		async function getGenerations(): Promise<void> {
			const api = new GameClient();
			const _generations = await api.listGenerations();
			const _generations_list = _generations.results.map((generation) => generation.name);
			setGenerations(_generations_list);
		}
		void getGenerations();
	}, []);
	React.useEffect(() => {
		if (generationList.length === 0) return;
		setPokemonData(new Map());
		async function getPokemonData(): Promise<void> {
			const api = new PokemonClient();
			const _pokemon = await Promise.all(generationList.map((pokemon) => api.getPokemonById(pokemon)));
			setPokemonData(new Map(_pokemon.map((p) => [p.id, p])));
		}
		void getPokemonData();
	}, [generationList]);
	const HandleSearch = React.useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
			if (e.target.value.trim() === "") return setSearchData(new Map());
			setSearchData(new Map());
			const api = new PokemonClient();
			const search = pokemonList
				.filter((pokemon) => pokemon.toLocaleLowerCase().startsWith(e.target.value.toLowerCase()))
				.slice(0, 10);
			const _pokemon = await Promise.all(search.map((pokemon) => api.getPokemonByName(pokemon)));
			setSearchData(new Map(_pokemon.map((p) => [p.id, p])));
		},
		[searchBarRef, pokemonList]
	);
	return (
		<div className="flex h-full w-full flex-col items-center border-x bg-gray-500 bg-opacity-20 backdrop-blur-sm backdrop-filter dark:bg-gray-800 dark:bg-opacity-20">
			<div className="relative mt-5 flex w-4/5 flex-row rounded-full shadow-lg sm:w-2/3">
				<FaMagnifyingGlass className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-neutral-900 dark:text-neutral-100" />
				<input
					ref={searchBarRef}
					/* eslint-disable-next-line @typescript-eslint/no-misused-promises */
					onChange={HandleSearch}
					className="w-full truncate rounded-full bg-neutral-300 bg-opacity-40 p-2 px-5 pl-10 text-neutral-900 dark:bg-neutral-500 dark:bg-opacity-40 dark:text-neutral-100"
					type="text"
					placeholder="Search for a Pokemon"
				/>
				{Boolean(generations.length) && (
					<Select
						onValueChange={(value): void => {
							if (searchBarRef.current) searchBarRef.current.value = "";
							setGeneration(generations.indexOf(value) + 1);
						}}
						value={generations[generation - 1]}>
						<SelectTrigger className="absolute right-0 w-auto border-0 outline-none ring-0" />
						<SelectContent align="center">
							{generations.map((gen) => (
								<SelectItem
									key={gen.toLocaleUpperCase()}
									value={gen}
									className="text-center text-neutral-900 dark:text-neutral-100">
									{gen.toLocaleUpperCase()}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			</div>
			<div className="mt-5 flex h-[70vh] flex-wrap justify-center overflow-y-scroll scrollbar-hide">
				{Array.from(searchData.size && searchBarRef.current?.value ? searchData.values() : pokemonData.values())
					.sort((a, b) => a.id - b.id)
					.map((pokemon) => (
						<PokemonCard key={pokemon.id} pokemon={pokemon} />
					))}
			</div>
		</div>
	);
}
