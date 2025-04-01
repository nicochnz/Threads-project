const { PHRASE_DEVELOPMENT_SERVER } = require("next/constants");
module.exports = (env) => {
	if (env === PHRASE_DEVELOPMENT_SERVER) {
		return {
			env: {
				MONGODB_CLIENT:
					"mongodb+srv://chichenicolas:98RMNm3RSd080jO2@cluster0.cz0jjma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
				MONGODB_DATABASE: "threads",
				NEXTAUTH_SECRET: "secret",
			},
		};
	}
	return {
		env: {
			MONGODB_CLIENT:
				"mongodb+srv://chichenicolas:98RMNm3RSd080jO2@cluster0.cz0jjma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
			MONGODB_DATABASE: "threads",
			NEXTAUTH_SECRET: "secret",
		},
	};
};
