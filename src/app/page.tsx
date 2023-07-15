import Image from "next/image";
import React from "react";

import BackGround from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { meta, MetaData } from "@/lib/models";

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateMetadata(): Promise<MetaData> {
	meta.title = "PokeDex";
	meta.description = "A fan-made PokeDex";
	meta.openGraph.title = "PokeDex";
	meta.openGraph.description = "A fan-made PokeDex";
	return meta;
}

export default function Home(): React.JSX.Element {
	return (
		<div className="h-screen overflow-hidden">
			<BackGround />
			<main className="z-1 flex h-full flex-grow flex-col justify-between bg-gray-500 bg-opacity-60 backdrop-filter dark:bg-gray-900 dark:bg-opacity-60">
				<section className="h-[10vh] border-b">
					<Navbar />
				</section>
				<section className="flex flex-grow flex-col items-center justify-center sm:px-[9.8vh]">
					<div className="flex h-full w-full flex-col items-center justify-center space-y-5 border-x bg-gray-500 bg-opacity-20 backdrop-blur-sm backdrop-filter dark:bg-gray-800 dark:bg-opacity-20">
						<Image
							src="/logo.png"
							alt="Logo"
							width={200}
							height={200}
							className="h-40 w-40 cursor-pointer"
						/>
						<div className="flex flex-col items-center justify-center space-y-5">
							<h1 className="text-center text-3xl font-bold md:text-5xl">Welcome to PokeLore</h1>
						</div>
					</div>
				</section>
				<section className="h-[10vh] border-t">
					<Footer />
				</section>
			</main>
		</div>
	);
}
