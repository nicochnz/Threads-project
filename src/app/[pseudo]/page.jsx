"use client";
import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Posts from "@/components/Posts/Posts";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Profile() {
	const params = useParams();
	const pseudo = params.pseudo.slice(3);
	const [user, setUser] = useState([]);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		if (!pseudo) {
			notFound();
		}
		fetchUserDataPosts();
	}, [pseudo]);
	const fetchUserDataPosts = async () => {
		const response = await fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ pseudo }),
		});
		const data = await response.json();
		if (!response.ok) {
			toast.error(
				"Une erreur est survenue lors de la récupération des données",
			);
		}
		setUser(data.user);
		setPosts(data.posts);
	};
	return (
		<ConnectedLayout>
			<div className="w-full md:w-[700px] mx-auto mt-10 text-white">
				<div className="flex justify-between gap-4">
					<div>
						<h1 className="text-3xl font-semibold">{user.pseudo}</h1>
						<div className="text-threads-gray-light mt-2">@{pseudo}</div>
						<div className="mt-5 whitespace-pre-line">{user.bio}</div>
						{user?.url && (
							<div className="mt-5 text-blue-500 hover:text-blue-400 duration-150 ">
								<a href={user.url} target="_blank" rel="noreferrer">
									{user.url}
								</a>
							</div>
						)}
					</div>
					<div>
						<Image
							src={user.profile}
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
