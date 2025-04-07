import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
	const data = await req.json();
	const pseudo = data.pseudo;
	let bio = data.bio;
	const url = data.url;
	const profile = data.profile;
	if (!bio) {
		bio = "-";
	}
	let client;
	try {
		client = await MongoClient.connect(process.env.MONGODB_CLIENT);
		const db = client.db(process.env.MONGODB_DATABASE);
		const user = await db
			.collection("users")
			.find({ pseudo })
			.limit(1)
			.toArray();
		if (user.length === 0) {
			return NextResponse.json(
				{ error: "Utilisateur non trouvé" },
				{ status: 404 },
			);
		}
		const result = await db
			.collection("users")
			.updateOne({ pseudo }, { $set: { bio, url, profile } });
		if (result.modifiedCount === 0) {
			return NextResponse.json(
				{ error: "Aucune modification effectuée" },
				{ status: 400 },
			);
		}
		return NextResponse.json(
			{ message: "Utilisateur mis à jour avec succès" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Erreur lors de la mise à jour:", error);
		return NextResponse.json(
			{ error: "Erreur lors de la mise à jour de l'utilisateur" },
			{ status: 500 },
		);
	} finally {
		if (client) {
			await client.close();
		}
	}
}
