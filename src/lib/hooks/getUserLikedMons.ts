"use client";

import { collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";

import { db } from "@/lib/firebase";
import { LikedMon, UserSession } from "@/lib/models";

export default function useUserLikedMons(): number[] {
	const { data: session } = useSession() as { data: UserSession | undefined };
	const [userLikedMons, setUserLikedMons] = React.useState<number[]>([]);
	React.useEffect(() => {
		if (!session?.token?.sub) {
			return;
		}
		onSnapshot(collection(db, "users", String(session.token.sub), "likedMons"), (snapshot) => {
			const likedMons = snapshot.docs.map((doc) => doc.data() as LikedMon).map((likedMon) => likedMon.pokemon_id);
			setUserLikedMons(likedMons);
		});
	}, [session?.token?.sub, db]);
	return userLikedMons;
}
