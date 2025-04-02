import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
	const data = await req.json();
	const { pseudo } = data;
	let client;

	try {
		client = await MongoClient.connect(process.env.MONGODB_CLIENT);
		const db = client.db(process.env.MONGODB_DATABASE);

		let user = await db.collection("users").find({ pseudo }).limit(1).toArray();

		if (user.length === 0) {
			return NextResponse.json(
				{ error: "L'utilisateur n'existe pas" },
				{ status: 404 },
			);
		}

		user = user.map((user) => ({
			...user,
			_id: user._id.toString(),
		}))[0];

		let posts = await db
			.collection("posts")
			.find({ pseudo })
			.sort({ creation: -1 })
			.toArray();

		posts = posts.map((post) => ({
			...post,
			_id: post._id.toString(),
		}));

		return NextResponse.json({ user, posts }, { status: 200 });
	} catch (error) {
		if (client) {
			await client.close();
		}
		return NextResponse.json({ error: error.message }, { status: 500 });
	} finally {
		if (client) {
			await client.close();
		}
	}
}
