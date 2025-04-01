"use client";

import { createUser } from "@/actions/create-user";
import Button from "@/components/Button/Button";
import { checkEmail } from "@/utils/check-email-syntax";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Signup() {
	const router = useRouter();
	const prepareCreateUser = async (formData) => {
		const pseudo = formData.get("pseudo");
		const email = formData.get("email");
		const password = formData.get("password");
		const confirmPassword = formData.get("confirmPassword");

		if (!pseudo || !email || !password || !confirmPassword) {
			toast.error("Veuillez remplir tous les champs");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Les mots de passe ne correspondent pas");
			return;
		}
		if (!checkEmail(email)) {
			toast.error("Veuillez entrer une adresse email valide");
			return;
		}

		try {
			await createUser(pseudo, email, password);
			toast.success("Votre compte a été créé avec succès!");
			router.push("/login/signin");
		} catch (error) {
			toast.error(
				error.message ||
					"Une erreur est survenue lors de la création du compte",
			);
		}
	};
	return (
		<div className="w-[440px] mx-auto">
			<h1 className="title flex items-center gap-1 text-left">
				<Link href="/login">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 256 256"
					>
						<title>Back arrow</title>
						<path
							fill="currentColor"
							d="M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8"
						/>
					</svg>
				</Link>
				Inscrivez-vous
			</h1>
			<form
				className="flex flex-col gap-4 mt-8"
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target);
					prepareCreateUser(formData);
				}}
			>
				<input
					type="text"
					name="pseudo"
					id="pseudo"
					placeholder="Pseudo"
					className="w-full bg-gray-900 rounded-xl p-5 text-gray-300 placeholder-gray-500"
				/>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Email"
					required
					className="w-full bg-gray-900 rounded-xl p-5 text-gray-300 placeholder-gray-500"
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Mot de passe"
					required
					className="w-full bg-gray-900 rounded-xl p-5 text-gray-300 placeholder-gray-500"
				/>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					placeholder="Confirmer le mot de passe"
					required
					className="w-full bg-gray-900 rounded-xl p-5 text-gray-300 placeholder-gray-500"
				/>
				<Button formButton>Inscription</Button>
			</form>
			<div className="flex items-center gap-4 mt-4">
				<div className="border-t border-threads-gray-light flex-1" />
				<div className="text-white">ou</div>
				<div className="border-t border-threads-gray-light flex-1" />
			</div>
			<Link href="/login/signin">
				<Button>Se connecter</Button>
			</Link>
		</div>
	);
}
