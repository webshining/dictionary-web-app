"use server";

import crypto from "crypto";
import jwt from "jsonwebtoken";
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

	const token = jwt.sign({ userId: user_id }, process.env.BOT_TOKEN!, { algorithm: "HS256" });
	const cookiesStore = await cookies();
	cookiesStore.set("session", token, { httpOnly: true, sameSite: "lax" });

	return true;
}

export async function checkAuthorized(): Promise<boolean> {
	return (await verify()) !== null;
}

export async function verify(): Promise<UserPayload | null> {
	const cookiesStore = await cookies();
	const session = cookiesStore.get("session");
	if (!session) return null;

	try {
		const decoded = jwt.verify(session.value, process.env.BOT_TOKEN!, { algorithms: ["HS256"] }) as UserPayload;
		return decoded;
	} catch {
		return null;
	}
}

interface UserPayload extends jwt.JwtPayload {
	userId: string;
}
