"use client";

import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { RecoilRoot } from "recoil";

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<html lang="en">
			<body>
				<SessionProvider>
					<ThemeProvider attribute="class">
						<RecoilRoot>{children}</RecoilRoot>
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
