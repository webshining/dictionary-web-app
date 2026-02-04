"use client";
import { useServerInsertedHTML } from "next/navigation";
import { useEffect, useState } from "react";
import { type DefaultTheme, ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components";

import { GlobalStyle } from "@/app/global.css";
import { init } from "@/lib/api";

const defaultTheme: DefaultTheme = {
	colors: {
		primary: "#4A4A4A",
		accent: "#4A4A4A",
		background: "#DAEBF6",
	},
};

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
	useServerInsertedHTML(() => {
		const styles = styledComponentsStyleSheet.getStyleElement();
		styledComponentsStyleSheet.instance.clearTag();
		return <>{styles}</>;
	});

	// const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);
	// useEffect(() => {
	// 	const waitForTelegram = (): Promise<any> => {
	// 		return new Promise((resolve) => {
	// 			const checkTelegram = () => {
	// 				const w = window as any;
	// 				if (w.Telegram && w.Telegram.WebApp) {
	// 					resolve(w.Telegram.WebApp);
	// 				} else {
	// 					setTimeout(checkTelegram, 100);
	// 				}
	// 			};
	// 			checkTelegram();
	// 		});
	// 	};

	// 	waitForTelegram().then((webapp) => {
	// 		setTheme({
	// 			colors: { primary: webapp.themeParams.text_color, accent: webapp.themeParams.accent_text_color },
	// 		});
	// 	});
	// }, []);

	useEffect(() => {
		let hash = window.location.hash;
		if (!hash) return;
		hash = hash.slice(1);
		const data = new URLSearchParams(hash).get("tgWebAppData");
		if (!data) return;
		init(data);
	}, []);

	return (
		<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
			<ThemeProvider theme={defaultTheme}>
				<GlobalStyle />
				{children}
			</ThemeProvider>
		</StyleSheetManager>
	);
};

export default Providers;
