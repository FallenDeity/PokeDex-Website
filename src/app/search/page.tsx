import React from "react";

import BackGround from "@/components/Background";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchContainer from "@/components/SearchContainer";
import { meta, MetaData } from "@/lib/models";

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateMetadata(): Promise<MetaData> {
	meta.title = "Search";
	meta.description = "Search for your favorite Pokemon";
	meta.openGraph.title = "Search";
	meta.openGraph.description = "Search for your favorite Pokemon";
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
				<section className="flex flex-grow flex-col items-center sm:px-[9.8vh]">
					<SearchContainer />
				</section>
				<section className="h-[10vh] border-t">
					<Footer />
				</section>
			</main>
		</div>
	);
}
