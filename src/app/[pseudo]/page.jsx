"use client";
import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import Posts from "@/components/Posts/Posts";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
export default function Profile() {
	const params = useParams();
	const pseudo = params.pseudo.slice(3);
	const [user, setUser] = useState([]);
	const [posts, setPosts] = useState([]);
	const { data: session } = useSession();
	const [openModale, setOpenModale] = useState(false);
	const [profileInput, setProfileInput] = useState("");
	const [pseudoInput, setPseudoInput] = useState("");
	const [bioInput, setBioInput] = useState("");
	const [linkInput, setLinkInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!pseudo) {
			router.push("/");
		}
		fetchUserDataPosts();
	}, []);
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
			if (!data.user) {
				router.push("/");
				return;
			}
			return;
		}
		setUser(data.user);
		setPosts(data.posts);
	};
	const editProfile = () => {
		setProfileInput(user.profile);
		setPseudoInput(user.pseudo);
		setBioInput(user.bio);
		setLinkInput(user.url);
		setOpenModale(true);
		const editUser = async () => {
			if (isLoading) return;
			setIsLoading(true);
			const response = await fetch("/api/user/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					pseudo: pseudoInput,
					bio: bioInput,
					url: linkInput,
					profile: profileInput,
				}),
			});
			const data = await response.json();
			if (!response.ok) {
				setIsLoading(false);
				toast.error("Une erreur est survenue lors de la mise à jour du profil");
				return;
			}
			const newUser = {
				...user,
				profile: profileInput,
				pseudo: pseudoInput,
				bio: bioInput,
				url: linkInput,
			};
			setUser(newUser);
			setOpenModale(false);
			toast.success("Profil mis à jour avec succès");
			setIsLoading(false);
		};
	};
	return (
		<ConnectedLayout>
			{openModale &&
				createPortal(
					<div
						className="modale-background"
						onClick={(e) => {
							if (e.target === e.currentTarget) {
								setOpenModale(false);
							}
						}}
						onKeyDown={(e) => {
							if (e.key === "Escape") {
								setOpenModale(false);
							}
						}}
					>
						<div className="modale-user-foreground bg-gray-900 rounded-lg shadow-xl">
							<div className="flex flex-col gap-4 p-6">
								<h2 className="text-xl font-semibold text-white">
									Modifier le profil
								</h2>
								<div className="flex flex-col gap-2">
									<label htmlFor="profile" className="text-white">
										Photo de profil
									</label>
									<label
										htmlFor="profile"
										className="bg-gray-800 p-2 rounded-lg text-white border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors flex items-center justify-center"
									>
										Choisir une photo
									</label>
									<input
										id="profile"
										type="file"
										accept="image/*"
										onChange={(e) => {
											const file = e.target.files[0];
											if (file) {
												const reader = new FileReader();
												reader.onloadend = () => {
													setProfileInput(reader.result);
												};
												reader.readAsDataURL(file);
											}
										}}
										className="hidden"
									/>
									{profileInput && (
										<Image
											src={profileInput}
											alt="Preview"
											width={100}
											height={100}
											className="rounded-full object-cover mt-2"
											unoptimized
										/>
									)}
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="pseudo" className="text-white">
										Pseudo
									</label>
									<input
										id="pseudo"
										type="text"
										value={pseudoInput}
										onChange={(e) => setPseudoInput(e.target.value)}
										className="bg-gray-800 p-2 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="bio" className="text-white">
										Bio
									</label>
									<textarea
										id="bio"
										value={bioInput}
										onChange={(e) => setBioInput(e.target.value)}
										className="bg-gray-800 p-2 rounded-lg text-white min-h-[100px] border border-gray-700 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="url" className="text-white">
										URL
									</label>
									<input
										id="url"
										type="url"
										value={linkInput}
										onChange={(e) => setLinkInput(e.target.value)}
										className="bg-gray-800 p-2 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-blue-500"
									/>
								</div>
								<div className="flex justify-end gap-4 mt-4">
									<button
										type="button"
										onClick={() => setOpenModale(false)}
										className="px-4 py-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
									>
										Annuler
									</button>
									<button
										type="button"
										onClick={async () => {
											try {
												if (!session?.user) {
													toast.error(
														"Vous devez être connecté pour modifier votre profil",
													);
													return;
												}
												setIsLoading(true);
												const response = await fetch("/api/user/update", {
													method: "POST",
													headers: {
														"Content-Type": "application/json",
													},
													body: JSON.stringify({
														pseudo: pseudoInput,
														bio: bioInput,
														url: linkInput,
														profile: profileInput,
													}),
												});
												const data = await response.json();
												if (!response.ok) {
													throw new Error(
														data.message || "Erreur lors de la mise à jour",
													);
												}
												toast.success("Profil mis à jour avec succès");
												setOpenModale(false);
												fetchUserDataPosts();
											} catch (error) {
												console.error("Erreur de mise à jour:", error);
												toast.error(
													error.message ||
														"Erreur lors de la mise à jour du profil",
												);
											} finally {
												setIsLoading(false);
											}
										}}
										disabled={isLoading}
										className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-100 duration-150 font-semibold disabled:opacity-50 cursor-pointer"
									>
										{isLoading ? "Enregistrement..." : "Enregistrer"}
									</button>
								</div>
							</div>
						</div>
					</div>,
					document.body,
				)}
			<div className="w-full md:w-[700px] mx-auto mt-10 text-white">
				<div className="flex justify-between gap-4">
					<div>
						<h1 className="text-3xl font-semibold">{user.pseudo}</h1>
						<div className="text-gray-400 mt-2">@{pseudo}</div>
						<div className="mt-5 whitespace-pre-line">{user.bio}</div>
						{user?.url && (
							<div className="mt-5 text-blue-500 hover:text-blue-400 duration-150">
								<a href={user.url} target="_blank" rel="noreferrer">
									{user.url}
								</a>
							</div>
						)}
					</div>
					<div>
						<Image
							src={user.profile || "/picture.png"}
							alt="user"
							width={100}
							height={100}
							className="rounded-full object-cover"
							unoptimized
						/>
					</div>
				</div>
				{session?.user?.pseudo === pseudo && (
					<button
						type="button"
						onClick={editProfile}
						className="mt-5 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-100 duration-150 font-semibold cursor-pointer"
					>
						Modifier le profil
					</button>
				)}
				<div className="flex mt-10">
					<div className="flex-1 border-b border-white pb-4 text-center hover:text-white duration-150 cursor-pointer">
						Threads
					</div>
					<div className="flex-1 border-b border-gray-700 text-gray-400 pb-4 text-center hover:text-white duration-150 cursor-pointer">
						Réponses
					</div>
					<div className="flex-1 border-b border-gray-700 text-gray-400 pb-4 text-center hover:text-white duration-150 cursor-pointer">
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
