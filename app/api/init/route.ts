import { host } from "@/lib/axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { tgWebAppData } = await req.json();

	const { data, headers } = await host.post("/init", { tgWebAppData });

	const response = NextResponse.json(data);

	const setCookieHeader = headers["set-cookie"];
	if (setCookieHeader) {
		for (const cookie of setCookieHeader) {
			const [cookieName, ...cookieValue] = cookie.split("=");
			(await cookies()).set(cookieName, cookieValue.join("="), {
				httpOnly: true,
				secure: true,
				sameSite: "none",
				domain: ".webshining.space",
			});
		}
	}

	return response;
}
