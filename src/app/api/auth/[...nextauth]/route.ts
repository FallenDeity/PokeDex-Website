import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { db } from "@/lib/firebase";
import { UserSession, UserToken } from "@/lib/models";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth({
	providers: [
		Google({
			clientId: String(process.env.GOOGLE_CLIENT_ID),
			clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
		}),
	],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async session({ session, token }: { session: UserSession; token: UserToken }): Promise<UserSession> {
			if (!session.user || !token.sub) {
				return session;
			}
			session.user.name = session.user.name ? session.user.name.split(" ").join("").toLocaleLowerCase() : "";
			session.token = token;
			const userDoc = await getDoc(doc(db, "users", String(session.token.sub)));
			if (!userDoc.exists()) {
				await setDoc(doc(db, "users", String(session.token.sub)), {
					username: session.user.name,
					email: session.user.email,
					avatar: session.user.image,
					createdAt: serverTimestamp(),
				});
			}
			return session;
		},
	},
});

export { handler as GET, handler as POST };
