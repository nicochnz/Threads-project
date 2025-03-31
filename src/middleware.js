import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export default function middleware(req) {
	let isAuthenticated = false;
	if (hasCookie("Guest", { cookies })) {
		isAuthenticated = true;
	}
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
