import Link from "next/link";

export default function Login() {
	return (
		<section>
			<h1 className="title">Comment souhaitez vous utilser Threads ?</h1>
			<div className="mt-5 w-[500px] mx-auto">
				<nav className="flex flex-col gap-4 auth-method">
					<Link href="/login/signup">
						<header>
							<h2 className="font-bold text-white">
								S'inscrire ou se connecter avec une adresse email
							</h2>
						</header>
						<article>
							<h2 className="text-threads-gray-light mt-4">
								Connectez vous ou créez un profil Threads avec une adresse
								email. Cela vous permettra de publier du contenu et d'intéragir
								sur Threads
							</h2>
						</article>
					</Link>
				</nav>
			</div>
			<div className="mt-5 w-[500px] mx-auto">
				<nav className="flex flex-col gap-4 auth-method">
					<Link href="/login/pass">
						<header>
							<h2 className="font-bold text-white">Utiliser sans profil</h2>
						</header>
						<article>
							<h2 className="text-threads-gray-light mt-4">
								Vous pouvez naviguer dans Threads sans profils, mais vous ne
								pourrez pas integrer du contenu ni intéragir avec.
							</h2>
						</article>
					</Link>
				</nav>
			</div>
		</section>
	);
}
