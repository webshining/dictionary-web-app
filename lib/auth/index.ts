"use server";

import crypto from "crypto";
import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export async function validate(data: string): Promise<boolean> {
	const initData = new URLSearchParams(data);
	const hash = initData.get("hash");

	initData.delete("hash");
	initData.sort();

	let dataCheckString = "";
	for (const [key, value] of initData.entries()) {
		dataCheckString += `${key}=${value}\n`;
	}
	dataCheckString = dataCheckString.slice(0, -1);

	const secretKey = crypto.createHmac("sha256", "WebAppData").update(process.env.BOT_TOKEN!).digest();
	const dataHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
	if (dataHash !== hash) return false;

	const user = initData.get("user");
	if (!user) return false;

	const user_id = String(JSON.parse(user)["id"]);

	const secret = new TextEncoder().encode(process.env.BOT_TOKEN!);
	const token = await new SignJWT({ sub: user_id }).setProtectedHeader({ alg: "HS256" }).sign(secret);
	const { set } = await cookies();
	await set("session", token, { httpOnly: true, sameSite: "lax" });

	return true;
}

export async function checkAuthorized(): Promise<boolean> {
	return (await verify()) !== null;
}

export async function verify(): Promise<JWTPayload | null> {
	const cookiesStore = await cookies();
	const session = cookiesStore.get("session");
	if (!session) return null;

	const secret = new TextEncoder().encode(process.env.BOT_TOKEN!);
	try {
		const { payload } = await jwtVerify(session.value, secret);
		return payload;
	} catch {
		return null;
	}
}
