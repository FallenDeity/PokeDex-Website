import Image from "next/image";
import { Pokemon } from "pokenode-ts";
import React from "react";

import { getTypeResistances, getTypeStrengths, getTypeWeak, getTypeWeaknesses, PokemonType } from "@/lib/PokemonTypes";

export default function Compare({ pokemon }: { pokemon: Pokemon }): React.JSX.Element {
	const types = pokemon.types.map((type) => type.type.name) as PokemonType[];
	return (
		<div className="flex flex-col space-y-3">
			<ul className="flex flex-col justify-center space-y-3">
				<li className="flex flex-row items-center space-x-2">
					<p className="mr-5 w-[8rem] text-right font-bold">EFFECTIVE</p>
					{Object.keys(getTypeStrengths(...types)).map((type) => (
						<Image
							key={type}
							width={40}
							height={40}
							className="flex h-10 w-10"
							src={`types/${type}.png`}
							alt={type}
						/>
					))}
				</li>
				<li className="flex flex-row items-center space-x-2">
					<p className="mr-5 w-[8rem] text-right font-bold">VULNERABLE</p>
					{Object.keys(getTypeWeaknesses(...types)).map((type) => (
						<Image
							key={type}
							width={40}
							height={40}
							className="flex h-10 w-10"
							src={`types/${type}.png`}
							alt={type}
						/>
					))}
				</li>
				<li className="flex flex-row items-center space-x-2">
					<p className="mr-5 w-[8rem] text-right font-bold">RESISTANT</p>
					{Object.keys(getTypeResistances(...types)).map((type) => (
						<Image
							key={type}
							width={40}
							height={40}
							className="flex h-10 w-10"
							src={`types/${type}.png`}
							alt={type}
						/>
					))}
				</li>
				<li className="flex flex-row items-center space-x-2">
					<p className="mr-5 w-[8rem] text-right font-bold">INEFFECTIVE</p>
					{Object.keys(getTypeWeak(...types)).map((type) => (
						<Image
							key={type}
							width={40}
							height={40}
							className="flex h-10 w-10"
							src={`types/${type}.png`}
							alt={type}
						/>
					))}
				</li>
			</ul>
		</div>
	);
}
