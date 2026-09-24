import { checkAuthorized } from "@/lib/auth";
import type React from "react";
import Providers from "./Providers";

const ServerProviders = async ({ children }: { children: React.ReactNode }) => {
	const authorized = await checkAuthorized();
	return <Providers authorized={authorized}>{children}</Providers>;
};

export default ServerProviders;
