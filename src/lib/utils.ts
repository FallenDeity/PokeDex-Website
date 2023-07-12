import { type ClassValue, clsx } from "clsx";
import { notFound } from "next/navigation";
import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export async function getPokemon({ params }: { params: { slug: string } }): Promise<Pokemon> {
	const api = new PokemonClient();
	try {
		if (isNaN(Number(params.slug))) {
			return await api.getPokemonByName(params.slug);
		}
		return await api.getPokemonById(Number(params.slug));
	} catch (error) {
		notFound();
	}
}

export function getDescription(species: PokemonSpecies): string {
	const description = species.flavor_text_entries.filter((entry) => entry.language.name === "en");
	if (description.length > 0) {
		return description[Math.floor(Math.random() * description.length)].flavor_text;
	}
	return "No description available.";
}
