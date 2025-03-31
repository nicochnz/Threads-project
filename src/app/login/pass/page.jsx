"use client";
import Button from "@/components/Button/Button";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Pass() {
	const router = useRouter();
	const onContinue = () => {
		setCookie("Guest", "true");
		router.push("/");
	};
	return (
		<section className="flex flex-col gap-4 w-[440px] mx-auto text-left">
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
				Continuer en mode invité
			</h1>
			<p className="text-threads-gray-light mt-4">
				Vous pouvez naviguer dans Threads sans profils, mais vous ne pourrez pas
				integrer du contenu ni intéragir avec.
			</p>
			<Button
				onClick={() => {
					onContinue();
				}}
			>
				Continuer
			</Button>
		</section>
	);
}
