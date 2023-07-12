"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { BiSolidLogInCircle } from "react-icons/bi";

import { UserSession } from "@/lib/models";

export default function LoginButton(): React.JSX.Element {
	const { data: session } = useSession() as { data: UserSession | undefined };
	const [user, setUser] = React.useState<UserSession>();
	const router = useRouter();
	React.useEffect((): void => {
		if (session) {
			setUser(session);
		}
	}, [session]);
	return (
		<div className="flex items-center justify-center">
			{user ? (
				<button
					aria-label="Login"
					type="button"
					className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-gray-800 shadow-md transition duration-300 ease-in-out hover:bg-gray-300 hover:ring-2 hover:ring-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
					/* eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-meaningless-void-operator */
					onClick={async (): Promise<void> => void (await signOut())}>
					<Image
						src={user.user?.image ?? "/user.png"}
						alt={user.user?.name ?? "Sign out"}
						width={40}
						height={40}
						className="h-10 w-10 rounded-md"
					/>
				</button>
			) : (
				<button
					aria-label="Login"
					type="button"
					className="flex h-10 w-10 items-center justify-center rounded bg-gray-200 text-gray-800 transition duration-300 ease-in-out hover:bg-gray-300 hover:ring-2 hover:ring-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
					onClick={(): void => router.push("/login")}>
					<BiSolidLogInCircle className="text-xl" />
				</button>
			)}
		</div>
	);
}
