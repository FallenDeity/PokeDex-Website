import Image from "next/image";
import React from "react";

import BackGround from "@/components/Background";

export default function Loader(): React.JSX.Element {
	return (
		<div className="h-screen overflow-hidden">
			<BackGround />
			<main className="z-1 flex h-full flex-grow flex-col justify-between bg-gray-500 bg-opacity-60 backdrop-filter dark:bg-gray-900 dark:bg-opacity-60">
				<section className="h-[10vh] border-b">
					<nav className="flex h-full flex-row items-center justify-between font-semibold">
						<div className="flex aspect-square h-full items-center justify-center border-r">
							<Image
								src="/logo.png"
								alt="Logo"
								width={40}
								height={40}
								className="h-10 w-10 cursor-pointer"
							/>
						</div>
						<div className="hidden flex-row items-center justify-between space-x-10 md:flex" />
						<div className="flex aspect-square h-full items-center justify-center border-l" />
					</nav>
				</section>
				<section className="flex flex-grow flex-col items-center justify-center sm:px-[9.8vh]">
					<div className="flex h-full w-full flex-col items-center justify-center space-y-5 border-x bg-gray-500 bg-opacity-20 backdrop-blur-sm backdrop-filter dark:bg-gray-800 dark:bg-opacity-20">
						<Image
							src="/pokeball-loader.gif"
							alt="Logo"
							width={200}
							height={200}
							className="h-40 w-40 cursor-pointer"
						/>
					</div>
				</section>
				<section className="h-[10vh] border-t">
					<nav className="flex h-full flex-row items-center justify-between font-semibold">
						<div className="flex aspect-square h-full items-center justify-center border-r" />
						<div className="hidden flex-row items-center justify-between space-x-10 md:flex" />
						<div className="flex aspect-square h-full items-center justify-center border-l" />
					</nav>
				</section>
			</main>
		</div>
	);
}
