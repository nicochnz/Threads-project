"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
export default function ConnectedLayout({ children }) {
	const pathname = usePathname();
	return (
		<section className="flex flex-col min-h-screen">
			{/*header*/}
			<header className="flex justify-between items-center gap-5">
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
				</nav>
				<Button>Se connecter</Button>
			</header>
			{/*content*/}
			<div className="flex-1">{children}</div>
			{/*footer*/}
			<Footer />
		</section>
	);
}
