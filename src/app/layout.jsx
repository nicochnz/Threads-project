import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
	title: "Threads",
	description:
		"Partagez vos idées, vos réalisations et vos expériences avec les autres.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="fr">
			<body className="bg-threads-gray-dark">
				{children}
				<ToastContainer position="bottom-right" />
			</body>
		</html>
	);
}
