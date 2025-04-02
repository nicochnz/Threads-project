import Image from "next/image";
import Link from "next/link";

const formatTimeAgo = (date) => {
	const now = Date.now();
	const postDate = new Date(date).getTime();
	const diffInSeconds = Math.floor((now - postDate) / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);

	if (diffInSeconds < 60) {
		return "à l'instant";
	}
	if (diffInMinutes < 60) {
		return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""}`;
	}
	if (diffInHours < 24) {
		return `il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`;
	}
	if (diffInDays < 7) {
		return `il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`;
	}
	return new Date(date).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
};

export default function Posts({ post }) {
	return (
		<article className="post">
			<figure>
				<Image
					src={post.profile}
					alt="profile"
					width={50}
					height={50}
					className="rounded-full object-cover"
				/>
			</figure>
			<header className="text-white w-full">
				<div className="flex flex-col">
					<Link href={`/@${post.pseudo}`}>
						<b>{post.pseudo}</b>
					</Link>
					<div className="whitespace-pre-line">{post.content}</div>
					<span className="text-sm text-threads-gray-light">
						{formatTimeAgo(post.creation)}
					</span>
				</div>
			</header>
		</article>
	);
}
