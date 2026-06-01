"use client";

import { validate } from "@/lib/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();
const Providers = ({ authorized, children }: { authorized: boolean; children: React.ReactNode }) => {
	const [validated, setValidated] = useState(authorized);

	useEffect(() => {
		const user = window.Telegram.WebApp.initDataUnsafe.user;
		if (!user) return;
		if (!authorized) validate(window.Telegram.WebApp.initData).then((v) => setValidated(v));
	}, [authorized]);

	return validated ? <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> : null;
};

export default Providers;
