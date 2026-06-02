"use client";

import { validate } from "@/lib/auth";
import useLanguage from "@/store/language";
import type { LanguageType } from "@/types/language";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();
const Providers = ({
	authorized,
	languages,
	children,
}: {
	authorized: boolean;
	languages: LanguageType[];
	children: React.ReactNode;
}) => {
	const [validated, setValidated] = useState(false);
	const setLanguages = useLanguage((s) => s.setLanguages);

	useEffect(() => {
		setLanguages(languages);
		const user = window.Telegram.WebApp.initDataUnsafe.user;
		if (!user) return;
		if (authorized) setValidated(true);
		else validate(window.Telegram.WebApp.initData).then((v) => setValidated(v));
	}, [authorized, languages, setLanguages]);

	return validated ? <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> : null;
};

export default Providers;
