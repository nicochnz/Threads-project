import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Posts from "@/components/Posts/Posts";
export default function Index() {
	const posts = [
		{
			_id: "1",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
			createdAt: new Date(),
			pseudo: "John Doe",
			profile: "/picture.png",
		},
		{
			_id: "2",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
			createdAt: new Date(),
			pseudo: "John Doe",
			profile: "/picture.png",
		},
		{
			_id: "3",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
			createdAt: new Date(),
			pseudo: "John Doe",
			profile: "/picture.png",
		},
		{
			_id: "4",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
			createdAt: new Date(),
			pseudo: "John Doe",
			profile: "/picture.png",
		},
		{
			_id: "5",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
			createdAt: new Date(),
			pseudo: "John Doe",
			profile: "/picture.png",
		},
	];
	return (
		<ConnectedLayout>
			<div className="w-full md:w-[700px] mx-auto mt-10">
				{/*New post*/}
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
