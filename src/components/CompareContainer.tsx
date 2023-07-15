"use client";

import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { useRecoilState } from "recoil";

import { compareMons } from "@/components/atoms/compareMons";
import Compare from "@/components/Compare";
import PokemonCard from "@/components/PokemonCard";

export default function CompareContainer(): React.JSX.Element {
	const compare = useRecoilState(compareMons)[0];
	return (
		<div className="flex h-full w-full flex-col items-center justify-center space-y-5 border-x bg-gray-500 bg-opacity-20 backdrop-blur-sm backdrop-filter dark:bg-gray-800 dark:bg-opacity-20">
			<div className="flex h-[80vh] w-full flex-col items-center justify-between overflow-y-scroll scrollbar-hide xl:flex-row">
				{compare.mon_1 ? (
					<div className="flex w-full flex-col items-center justify-center space-y-5 lg:w-1/2">
						<PokemonCard pokemon={compare.mon_1} />
						<Compare pokemon={compare.mon_1} />
					</div>
				) : (
					<PlusCircleIcon className="m-3 mx-auto block h-40 w-40 cursor-pointer text-green-500" />
				)}
				{compare.mon_2 ? (
					<div className="flex w-full flex-col items-center justify-center space-y-5 lg:w-1/2">
						<PokemonCard pokemon={compare.mon_2} />
						<Compare pokemon={compare.mon_2} />
					</div>
				) : (
					<PlusCircleIcon className="m-3 mx-auto block h-40 w-40 cursor-pointer text-green-500" />
				)}
			</div>
		</div>
	);
}
