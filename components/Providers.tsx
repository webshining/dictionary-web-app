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

	useEffect(() => {
		let hash = window.location.hash;
		if (!hash) return;
		hash = hash.slice(1);
		const data = new URLSearchParams(hash).get("tgWebAppData");
		if (!data) return;
		init(data).then(() => {
			window.location.replace(`${window.location.origin}${window.location.pathname}`);
		});
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
