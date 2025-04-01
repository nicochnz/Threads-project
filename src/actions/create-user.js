"use server";
import { checkEmail } from "@/utils/check-email-syntax";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

export const createUser = async (pseudo, email, password) => {
	if (!pseudo || !email || !password) {
		throw new Error("Veuillez remplir tous les champs");
	}
	if (!checkEmail(email)) {
		throw new Error("Veuillez entrer une adresse email valide");
	}

	const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
	const db = client.db("threads");

	try {
		const existingEmail = await db.collection("users").findOne({ email });
		if (existingEmail) {
			throw new Error("Cette adresse email est déjà utilisée");
		}

		const existingPseudo = await db.collection("users").findOne({ pseudo });
		if (existingPseudo) {
			throw new Error("Ce pseudo est déjà utilisé");
		}

		const encryptedPassword = await bcrypt.hash(password, 10);
		await db.collection("users").insertOne({
			pseudo,
			email,
			password: encryptedPassword,
			profile: "/picture.png",
			bio: "-",
			url: "",
			creation: new Date(),
		});
	} finally {
		await client.close();
	}
};
