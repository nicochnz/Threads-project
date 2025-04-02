import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import "moment/locale/fr";
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
						{moment(post.creation).fromNow()}
					</span>
				</div>
			</header>
		</article>
	);
}
