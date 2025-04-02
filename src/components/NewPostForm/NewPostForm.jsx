"use client";
import { createPost } from "@/actions/create-post";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button/Button";
export default function NewPostForm() {
	const { data: session } = useSession();
	const [textarea, setTextarea] = useState("");
	const onPrepare = async (formData) => {
		try {
			await createPost(formData);
			setTextarea("");
			toast.success("Thread publié avec succès");
		} catch (error) {
			return toast.error(error.message);
		}
	};
	return (
		<form action={onPrepare}>
			<div className="flex gap-3 w-full">
				<div>
					{session?.user?.profile && (
						<Image
							src={session.user.profile}
							alt="user"
							width={50}
							height={50}
							className="rounded-full mt-5"
						/>
					)}
				</div>
				<div className="flex-1">
					<textarea
						name="content"
						id="content"
						placeholder="Commencer un thread..."
						value={textarea}
						className="input"
						onChange={(e) => setTextarea(e.target.value)}
					/>
				</div>
			</div>
			<div className="flex justify-end">
				<Button formButton disabled={textarea.length < 1}>
					Publier
				</Button>
			</div>
		</form>
	);
}
