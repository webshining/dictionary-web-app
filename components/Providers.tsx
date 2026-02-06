"use client";
import { useEffect } from "react";

import { init } from "@/lib/api";

const Providers = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		let hash = window.location.hash;
		if (!hash) return;
		hash = hash.slice(1);
		const data = new URLSearchParams(hash).get("tgWebAppData");
		init(data).then((data) => {
			if (data === null) return (window as any).Telegram.WebApp.close();
			window.location.replace(`${window.location.origin}${window.location.pathname}`);
		});
	}, []);

	return children;
};

export default Providers;
