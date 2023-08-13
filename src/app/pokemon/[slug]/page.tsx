import { PokemonClient } from "pokenode-ts";
import React from "react";

import BackGround from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PokemonContainer from "@/components/PokemonContainer";
import { meta, MetaData } from "@/lib/models";
import { getDescription, getPokemon } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<MetaData> {
	const api = new PokemonClient();
	const pokemon = await getPokemon({ params });
	const species = await api.getPokemonSpeciesById(parseInt(pokemon.species.url.split("/")[6]));
	meta.title = pokemon.name;
	meta.description = getDescription(species);
	meta.openGraph.title = pokemon.name;
	meta.openGraph.description = getDescription(species);
	meta.openGraph.images = String(
		pokemon.sprites.other?.["official-artwork"]?.front_default ?? pokemon.sprites.front_default
	);
	return meta;
}

export default function Page({ params }: { params: { slug: string } }): React.JSX.Element {
	return (
		<div className="h-screen overflow-hidden">
			<BackGround />
			<main className="z-1 flex h-full flex-grow flex-col justify-between bg-gray-500 bg-opacity-60 backdrop-filter dark:bg-gray-900 dark:bg-opacity-60">
				<section className="h-[10vh] border-b">
					<Navbar />
				</section>
				<section className="flex flex-grow flex-col items-center justify-center md:px-[9.8vh]">
					<PokemonContainer params={params} />
				</section>
				<section className="h-[10vh] border-t">
					<Footer />
				</section>
			</main>
		</div>
	);
}

/*
export async function generateStaticParams(): Promise<{ slug: string }[]> {
	const api = new PokemonClient();
	const p_list = await api.listPokemons(0, 100_000);
	const p_names = p_list.results.map((p) => p.name);
	const p_ids = p_list.results.map((p) => p.url.split("/")[6]);
	p_names.push(...p_ids);
	return p_names.map((p) => ({ slug: p }));
}
*/
