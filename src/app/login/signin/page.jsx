"use client";
import Button from "@/components/Button/Button";
import { checkEmail } from "@/utils/check-email-syntax";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Signin() {
	const router = useRouter();
	const prepareLogin = async (formData) => {
		const email = formData.get("email");
		const password = formData.get("password");
		if (!email || !password) {
			return toast.error("Veuillez remplir tous les champs");
		}
		if (!checkEmail(email)) {
			return toast.error("veuillez entrer une adresse email valide");
		}
		try {
			const response = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});
			if (response.error) {
				return toast.error(response.error);
			}
		} catch (error) {
			return toast.error(error.message);
		}
		toast.success("Connexion réussie");
		router.replace("/");
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
				Connectez-vous
			</h1>
			<form className="flex flex-col gap-4 mt-8" action={prepareLogin}>
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
				<Button formButton>Se connecter</Button>
			</form>
			<div className="flex items-center gap-4 mt-4">
				<div className="border-t border-threads-gray-light flex-1" />
				<div className="text-white">ou</div>
				<div className="border-t border-threads-gray-light flex-1" />
			</div>
			<Link href="/login/signup">
				<Button>Créer un compte</Button>
			</Link>
		</div>
	);
}
