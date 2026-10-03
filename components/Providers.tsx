"use client";

import { validate } from "@/lib/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: React.ReactNode }) => {
	const [validated, setValidated] = useState(false);

	useEffect(() => {
		const user = window.Telegram.WebApp.initDataUnsafe.user;
		if (!user) return;
		validate(window.Telegram.WebApp.initData).then((v) => setValidated(v));
	}, []);

	useEffect(() => {
		if (["android", "ios"].includes(window.Telegram.WebApp.platform)) window.Telegram.WebApp.requestFullscreen();
	}, []);

	return validated ? <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> : null;
};

export default Providers;
