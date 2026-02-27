"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

import { init } from "@/lib/api";
import GlobalStyle from "./GlobalStyle.css";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		let hash = window.location.hash;
		if (!hash) {
			setReady(true);
			return;
		}
		hash = hash.slice(1);
		const data = new URLSearchParams(hash).get("tgWebAppData");
		init(data).then((data) => {
			if (data === null) {
				return (window as any).Telegram.WebApp.close();
			}
			window.location.replace(`${window.location.origin}${window.location.pathname}`);
		});
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyle />
			{ready && children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
