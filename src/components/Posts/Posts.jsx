"use client";
import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import "moment/locale/fr";
import { deletePost } from "@/actions/delete-post";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Posts({ post }) {
	const { data: session } = useSession();
	const [showOptions, setShowOptions] = useState(false);

	const onDeletePost = async () => {
		if (!confirm("Voulez-vous vraiment supprimer ce post ?")) return;
		try {
			await deletePost(post._id);
			toast.success("Post supprimé avec succès");
		} catch (error) {
			toast.error("Une erreur est survenue lors de la suppression du post");
		}
	};

	return (
		<article className="post">
			<figure>
				<Image
					src={post.profile}
					alt="profile"
					width={50}
					height={50}
					className="rounded-full object-cover"
				/>
			</figure>
			<header className="text-white w-full">
				<div className="flex flex-col">
					<div className="flex justify-between items-start">
						<Link href={`/@${post.pseudo}`}>
							<b>{post.pseudo}</b>
						</Link>
						{session?.user && (
							<div className="relative">
								<button
									type="button"
									onClick={() => setShowOptions(!showOptions)}
									className="p-1 cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
									aria-label="Options du post"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 16 16"
										className="cursor-pointer"
									>
										<title>Options du post</title>
										<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
									</svg>
								</button>
								{showOptions && (
									<>
										<div
											className="fixed inset-0 z-40"
											onClick={() => setShowOptions(false)}
											onKeyDown={(e) => {
												if (e.key === "Escape") {
													setShowOptions(false);
												}
											}}
										/>
										<div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-lg shadow-lg z-50">
											{session?.user && session.user.pseudo !== post.pseudo ? (
												<button
													type="button"
													className="block w-full px-4 py-2 text-left text-white hover:bg-gray-800 transition-colors duration-150 cursor-pointer"
													onClick={(e) => {
														e.stopPropagation();
													}}
												>
													Signaler
												</button>
											) : (
												<>
													<button
														type="button"
														className="block w-full px-4 py-2 text-left text-white hover:bg-gray-800 transition-colors duration-150 cursor-pointer"
														onClick={(e) => {
															e.stopPropagation();
															onDeletePost();
														}}
													>
														Supprimer
													</button>
													<button
														type="button"
														className="block w-full px-4 py-2 text-left text-white hover:bg-gray-800 transition-colors duration-150 cursor-pointer"
														onClick={(e) => {
															e.stopPropagation();
														}}
													>
														Modifier
													</button>
												</>
											)}
										</div>
									</>
								)}
							</div>
						)}
					</div>
					<div className="whitespace-pre-line">{post.content}</div>
					<span className="text-sm text-gray-400">
						{moment(post.creation).fromNow()}
					</span>
				</div>
			</header>
		</article>
	);
}
