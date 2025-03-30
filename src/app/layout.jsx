import "./globals.css";

export const metadata = {
	title: "Threads",
	description:
		"Partagez vos idées, vos réalisations et vos expériences avec les autres.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="fr">
			<body className="bg-threads-gray-dark">{children}</body>
		</html>
	);
}
