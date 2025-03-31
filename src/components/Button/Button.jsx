"use client";

export default function Button({ children, onClick, withoutMarginTop }) {
	return (
		<div className="flex items-center justify-center">
			<button
				type="button"
				className={`bg-white hover:bg-gray-500 duration-150 rounded-3xl border-threads-gray-light py-3 px-6 w-full ${withoutMarginTop ? "" : "mt-4"} cursor-pointer`}
				onClick={onClick}
			>
				{children}
			</button>
		</div>
	);
}
