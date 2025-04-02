import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
export const authOptions = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials;
				try {
					const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

					const db = client.db("Threads");

					let user = await db
						.collection("users")
						.find({ email: email })
						.limit(1)
						.toArray();

					if (user.length === 0) {
						await client.close();
						throw new Error(
							"Aucun utilisateur trouvé avec cette adresse email",
						);
					}

					const passwordsMatch = await bcrypt.compare(
						password,
						user[0].password,
					);

					if (!passwordsMatch) {
						await client.close();
						throw new Error("Mot de passe incorrect");
					}

					user = user.map((user) => ({
						_id: user._id.toString(),
						pseudo: user.pseudo,
						email: user.email,
						profile: user.profile,
					}))[0];
					await client.close();
					return user;
				} catch (error) {
					console.error("Erreur lors de la connexion:", error.message);
					throw new Error(error.message);
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login/signin",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
