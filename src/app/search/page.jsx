import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";

export default function Search() {
	return (
		<ConnectedLayout>
			<div className="w-full md:w-[700px] mx-auto mt-10 text-white">
				<div className="flex">
					<input
						type="search"
						placeholder="Rechercher"
						className="w-full bg-gray-950 rounded-xl p-5"
					/>
				</div>
				<p className="text-threads-gray-light text-sm mt-27 text-center">
					Recherchez des profils à découvrir
				</p>
			</div>
		</ConnectedLayout>
	);
}
