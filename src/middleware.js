import { NextResponse } from "next/server";

export default function middleware(req) {
	const isAuthenticated = false;

	if (!isAuthenticated) {
		const url = req.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/"],
};
