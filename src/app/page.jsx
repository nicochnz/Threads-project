import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import NewPostForm from "@/components/NewPostForm/NewPostForm";
import Posts from "@/components/Posts/Posts";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
export default async function Index() {
	const session = await getServerSession(authOptions);
	let posts;
	let client;
	try {
		client = await MongoClient.connect(process.env.MONGODB_CLIENT);
		const db = client.db(process.env.MONGODB_DATABASE);
		posts = await db
			.collection("posts")
			.find()
			.sort({ creation: -1 })
			.toArray();
		posts = posts.map((post) => ({
			...post,
			_id: post._id.toString(),
		}));
		await client.close();
	} catch (error) {
		if (client) {
			await client.close();
		}
		throw new Error(error.message);
	}
	return (
		<ConnectedLayout>
			<div className="w-full md:w-[700px] mx-auto mt-10">
				{session?.user && (
					<div className="border-b border-threads-gray-light py-4">
						<NewPostForm />
					</div>
				)}
				{/*Post*/}
				{posts.map((post) => (
					<div key={post._id}>
						<Posts post={post} />
					</div>
				))}
			</div>
		</ConnectedLayout>
	);
}
