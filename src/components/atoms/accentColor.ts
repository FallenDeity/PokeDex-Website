import { atom } from "recoil";

export interface AccentColor {
	color: string;
	background: string;
	border: string;
}

export const accentColors: Record<string, AccentColor> = {
	bug: {
		color: "text-white",
		background: "bg-lime-500",
		border: "border-lime-500",
	},
	dark: {
		color: "text-white",
		background: "bg-gray-800",
		border: "border-gray-800",
	},
	dragon: {
		color: "text-white",
		background: "bg-cyan-700",
		border: "border-cyan-700",
	},
	electric: {
		color: "text-white",
		background: "bg-yellow-500",
		border: "border-yellow-500",
	},
	fairy: {
		color: "text-white",
		background: "bg-pink-400",
		border: "border-pink-400",
	},
	fighting: {
		color: "text-white",
		background: "bg-orange-800",
		border: "border-orange-800",
	},
	fire: {
		color: "text-white",
		background: "bg-orange-500",
		border: "border-orange-500",
	},
	flying: {
		color: "text-white",
		background: "bg-sky-400",
		border: "border-sky-400",
	},
	ghost: {
		color: "text-white",
		background: "bg-violet-700",
		border: "border-violet-700",
	},
	grass: {
		color: "text-white",
		background: "bg-green-500",
		border: "border-green-500",
	},
	ground: {
		color: "text-white",
		background: "bg-amber-900",
		border: "border-amber-900",
	},
	ice: {
		color: "text-white",
		background: "bg-cyan-500",
		border: "border-cyan-500",
	},
	normal: {
		color: "text-white",
		background: "bg-slate-500",
		border: "border-slate-500",
	},
	poison: {
		color: "text-white",
		background: "bg-fuchsia-700",
		border: "border-fuchsia-700",
	},
	psychic: {
		color: "text-white",
		background: "bg-pink-500",
		border: "border-pink-500",
	},
	rock: {
		color: "text-white",
		background: "bg-stone-500",
		border: "border-stone-500",
	},
	steel: {
		color: "text-white",
		background: "bg-zinc-500",
		border: "border-zinc-500",
	},
	water: {
		color: "text-white",
		background: "bg-blue-500",
		border: "border-blue-500",
	},
};

export const accentColor = atom({
	key: "accentColor",
	default: {
		color: "text-white",
		background: "bg-blue-500",
		border: "border-blue-500",
	} as AccentColor,
});
