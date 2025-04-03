"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import NewPostForm from "../NewPostForm/NewPostForm";
export default function ConnectedLayout({ children }) {
	const { data: session } = useSession();
	const pathname = usePathname();
	const [openModale, setOpenModale] = useState(false);
	useEffect(() => {
		if (openModale) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [openModale]);

	return (
		<section className="flex flex-col min-h-screen">
			{openModale &&
				createPortal(
					<div
						className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center top-0 left-0 bottom-0 right-0"
						onClick={(e) => {
							if (e.target === e.currentTarget) {
								setOpenModale(false);
							}
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setOpenModale(false);
							}
						}}
					>
						<div className="modale-foreground">
							<NewPostForm closeModale={() => setOpenModale(false)} />
						</div>
					</div>,
					document.body,
				)}
			{/*header*/}
			<header className="flex justify-between items-center gap-5 p-4">
				<Image src="/logo.png" alt="logo" width={40} height={40} />
				<nav className="flex gap-2">
					<Link href="/">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`w-10 h-10  hover:bg-gray-800 duration-150 rounded-xl p-1 ${pathname === "/" ? "text-white" : "text-gray-500"}`}
							viewBox="0 0 256 256"
						>
							<title>home</title>
							<path
								fill="currentColor"
								d="M218.83 103.77l-80-75.48a1.14 1.14 0 0 1-.11-.11a16 16 0 0 0-21.53 0l-.11.11l-79.91 75.48A16 16 0 0 0 32 115.55V208a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-48h32v48a16 16 0 0 0 16 16h48a16 16 0 0 0 16-16v-92.45a16 16 0 0 0-5.17-11.78M208 208h-48v-48a16 16 0 0 0-16-16h-32a16 16 0 0 0-16 16v48H48v-92.45l.11-.1L128 40l79.9 75.45l.1.1Z"
							/>
						</svg>
					</Link>
					<Link href="/search">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`w-10 h-10 hover:bg-gray-800 duration-150 rounded-xl p-1 ${pathname === "/search" ? "text-white" : "text-gray-500"}`}
							viewBox="0 0 256 256"
						>
							<title>search</title>
							<path
								fill="currentColor"
								d="m228.24 219.76l-51.38-51.38a86.15 86.15 0 1 0-8.48 8.48l51.38 51.38a6 6 0 0 0 8.48-8.48M38 112a74 74 0 1 1 74 74a74.09 74.09 0 0 1-74-74"
							/>
						</svg>
					</Link>
					{session?.user?.email && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-10 h-10 hover:bg-gray-800 duration-150 rounded-xl p-1 cursor-pointer text-gray-500"
							viewBox="0 0 256 256"
							onClick={() => setOpenModale(true)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									setOpenModale(true);
								}
							}}
						>
							<title>Create</title>
							<path
								fill="currentColor"
								d="m226.83 61.17l-32-32a4 4 0 0 0-5.66 0l-96 96A4 4 0 0 0 92 128v32a4 4 0 0 0 4 4h32a4 4 0 0 0 2.83-1.17l96-96a4 4 0 0 0 0-5.66M126.34 156H100v-26.34l68-68L194.34 88ZM200 82.34L173.66 56L192 37.66L218.34 64ZM220 128v80a12 12 0 0 1-12 12H48a12 12 0 0 1-12-12V48a12 12 0 0 1 12-12h80a4 4 0 0 1 0 8H48a4 4 0 0 0-4 4v160a4 4 0 0 0 4 4h160a4 4 0 0 0 4-4v-80a4 4 0 0 1 8 0"
							/>
						</svg>
					)}
					{session?.user?.email && (
						<Link href={`/@${session.user.pseudo}`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={`w-10 h-10 hover:bg-gray-800 duration-150 rounded-xl p-1 ${pathname.includes("@") ? "text-white" : "text-gray-500"}`}
								viewBox="0 0 256 256"
							>
								<title>Profile</title>
								<path
									fill="currentColor"
									d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56"
								/>
							</svg>
						</Link>
					)}
				</nav>
				{session ? (
					<Button withoutMarginTop onClick={() => signOut()}>
						Se déconnecter
					</Button>
				) : (
					<Link href="/login">
						<Button withoutMarginTop>Se connecter</Button>
					</Link>
				)}
			</header>
			{/*content*/}
			<div className="flex-1">{children}</div>
			{/*footer*/}
			<Footer />
		</section>
	);
}
