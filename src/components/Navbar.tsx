"use client";

import { LogInIcon, LogOutIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import React, { useMemo } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GiHamburgerMenu, GiInterleavedArrows } from "react-icons/gi";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { useRecoilState } from "recoil";

import LoginButton from "@/components/LoginButton";
import ThemeToggleButton from "@/components/ThemeToggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserSession } from "@/lib/models";

import { accentColor } from "./atoms/accentColor";

export default function Navbar(): React.JSX.Element {
	const { systemTheme, theme, setTheme } = useTheme();
	const currentTheme = theme === "system" ? systemTheme : theme;
	const isDark = currentTheme === "dark";
	const pathName = usePathname();
	const { data: session } = useSession() as { data: UserSession | undefined };
	const [user, setUser] = React.useState<UserSession>();
	const router = useRouter();
	const color = useRecoilState(accentColor)[0];
	const routes = useMemo(
		() => [
			{
				name: "Search",
				path: "/search",
				icon: FaMagnifyingGlass,
			},
			{
				name: "Compare",
				path: "/compare",
				icon: GiInterleavedArrows,
			},
			{
				name: "Pokemon",
				path: "/pokemon",
				icon: BiInfoCircle,
			},
			{
				name: "Favorites",
				path: "/favorites",
				icon: StarIcon,
			},
		],
		[pathName]
	);
	React.useEffect((): void => {
		if (session) {
			setUser(session);
		}
	}, [session]);
	return (
		<nav className="flex h-full flex-row items-center justify-between font-semibold">
			<div
				className="flex aspect-square h-full items-center justify-center border-r"
				onClick={(): void => router.push("/")}>
				<Image src="/logo.png" alt="Logo" width={40} height={40} className="h-10 w-10 cursor-pointer" />
			</div>
			<div className="hidden h-full flex-row items-center justify-between space-x-8 md:flex">
				{routes.map((route) => (
					<div
						key={route.name}
						className={`flex h-full transform cursor-pointer flex-row items-center justify-between space-x-2 px-3 transition-all duration-300 ease-in-out ${
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							pathName.includes(route.path) && `border-b-4 ${color.border}`
						}`}
						style={{ borderBottomColor: color.border }}
						onClick={(): void => router.push(route.path)}>
						<span className="text-lg">{route.name.toLocaleUpperCase()}</span>
					</div>
				))}
				<ThemeToggleButton />
			</div>
			<div className="hidden aspect-square h-full items-center justify-center border-l md:flex">
				<LoginButton />
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex aspect-square h-full items-center justify-center border-l md:hidden">
						<GiHamburgerMenu className="cursor-pointer text-2xl" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuGroup>
						{routes.map((route) => (
							<DropdownMenuItem key={route.name} onClick={(): void => router.push(route.path)}>
								{route.name}
								<DropdownMenuShortcut>
									<route.icon className="h-3 w-3" />
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={(): void => setTheme(isDark ? "light" : "dark")}>
							{isDark ? "Light" : "Dark"}
							<DropdownMenuShortcut>
								{isDark ? <RiSunFill size={15} /> : <RiMoonClearFill size={15} />}
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						{user ? (
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							<DropdownMenuItem onClick={(): Promise<void> => signOut()}>
								Logout
								<DropdownMenuShortcut>
									<LogOutIcon size={15} />
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem onClick={(): void => router.push("/login")}>
								Login
								<DropdownMenuShortcut>
									<LogInIcon size={15} />
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						)}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	);
}
