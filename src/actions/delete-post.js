"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId) => {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			throw new Error("Vous devez être connecté pour supprimer un post");
		}

		const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
		const db = client.db(process.env.MONGODB_DATABASE);

		const post = await db
			.collection("posts")
			.find({ _id: new ObjectId(postId) })
			.toArray();

		if (post.length === 0) {
			throw new Error("Post non trouvé");
		}

		if (post[0].pseudo !== session.user.pseudo) {
			throw new Error("Vous n'avez pas les permissions pour supprimer ce post");
		}

		await db.collection("posts").deleteOne({ _id: new ObjectId(postId) });
		await client.close();

		revalidatePath("/");
	} catch (error) {
		console.error("Erreur lors de la suppression:", error);
		throw new Error(
			error.message || "Une erreur est survenue lors de la suppression du post",
		);
	}
};
