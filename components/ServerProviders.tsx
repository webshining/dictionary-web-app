import type React from "react";
import Providers from "./Providers";

const ServerProviders = async ({ children }: { children: React.ReactNode }) => {
	return <Providers>{children}</Providers>;
};

export default ServerProviders;
