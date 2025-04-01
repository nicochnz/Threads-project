"use client";
import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Posts from "@/components/Posts/Posts";
import Image from "next/image";
import { useParams } from "next/navigation";
export default function Profile() {
	const params = useParams();
	const pseudo = params.pseudo.slice(3);
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
			<div className="w-full md:w-[700px] mx-auto mt-10 text-white">
				<div className="flex justify-between gap-4">
					<div>
						<h1 className="text-3xl font-semibold">{pseudo}</h1>
						<div className="text-threads-gray-light mt-2">@{pseudo}</div>
						<div className="mt-5 whitespace-pre-line">Biographie</div>
						<div className="mt-5 text-blue-500 hover:text-blue-400 duration-150 ">
							<a href="https://believemy.com" target="_blank" rel="noreferrer">
								https://believemy.com
							</a>
						</div>
					</div>
					<div>
						<Image
							src="/picture.png"
							alt="user"
							width={100}
							height={100}
							className="rounded-full object-cover"
						/>
					</div>
				</div>
				<div className="flex mt-10">
					<div className="flex-1 border-b border-white pb-4 text-center hover:text-white duration-150 cursor-pointer">
						Threads
					</div>
					<div className="flex-1 border-b border-threads-gray-light text-threads-gray-light pb-4 text-center hover:text-white duration-150 cursor-pointer">
						Réponses
					</div>
					<div className="flex-1 border-b  border-threads-gray-light text-threads-gray-light pb-4 text-center hover:text-white duration-150 cursor-pointer">
						Republications
					</div>
				</div>
				<div>
					{posts.map((post) => (
						<div key={post._id}>
							<Posts post={post} />
						</div>
					))}
				</div>
			</div>
		</ConnectedLayout>
	);
}
