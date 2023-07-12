"use client";

import { DnaIcon, InfoIcon, LocateIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { MdSportsMartialArts } from "react-icons/md";
import { useRecoilState } from "recoil";

import { accentColor } from "./atoms/accentColor";
import { pokemonPage } from "./atoms/pokemonPage";

export default function Footer(): React.JSX.Element {
	const pathName = usePathname();
	const [page, setPage] = useRecoilState(pokemonPage);
	const color = useRecoilState(accentColor)[0];
	const routes = useMemo(
		() => [
			{
				icon: InfoIcon,
				name: "Description",
			},
			{
				name: "Evolutions",
				icon: DnaIcon,
			},
			{
				name: "Moves",
				icon: MdSportsMartialArts,
			},
			{
				name: "Encounter Areas",
				icon: LocateIcon,
			},
		],
		[]
	);
	return (
		<nav className="flex h-full flex-row items-center justify-between font-semibold">
			<div className="hidden aspect-square h-full items-center justify-center border-r md:flex" />
			<div className="flex h-full w-full flex-row items-center justify-between">
				{pathName.includes("/pokemon/") && (
					<>
						{routes.map((route) => (
							<div
								key={route.name}
								className={`flex h-full w-full transform cursor-pointer flex-row items-center justify-center space-x-2 px-3 transition-all duration-300 ease-in-out ${
									page === route.name ? `${color.background} ${color.color} ${color.border}` : ""
								}`}
								style={
									page === route.name
										? {
												backgroundColor: color.background,
												color: color.color,
												borderColor: color.border,
										  }
										: {}
								}
								onClick={(): void =>
									setPage(route.name as "Description" | "Evolutions" | "Moves" | "Encounter Areas")
								}>
								<span className="hidden text-xl md:block">{route.name.toLocaleUpperCase()}</span>
								<route.icon className="md:hidden" size={24} />
							</div>
						))}
					</>
				)}
			</div>
			<div className="hidden aspect-square h-full items-center justify-center border-l md:flex" />
		</nav>
	);
}
