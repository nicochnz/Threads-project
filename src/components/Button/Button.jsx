"use client";
import { useFormStatus } from "react-dom";
export default function Button({
	children,
	onClick,
	withoutMarginTop,
	formButton,
}) {
	const { pending } = useFormStatus();
	return (
		<div className="flex items-center justify-center">
			<button
				disabled={formButton && pending}
				type={formButton ? "submit" : "button"}
				className={`w-full bg-white disabled:bg-opacity-50 disabled:cursor-not-allowed text-black rounded-xl p-5 mt-4 font-medium hover:bg-gray-200 transition-colors cursor-pointer ${withoutMarginTop ? "" : "mt-4"} cursor-pointer`}
				onClick={onClick}
			>
				{children}
			</button>
		</div>
	);
}
