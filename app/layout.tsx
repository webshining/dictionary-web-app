import Providers from "@/components/Providers";
import { Metadata } from "next";
import { Carlito } from "next/font/google";
import Script from "next/script";
import "./global.css";

export const metadata: Metadata = {
	title: "Dictionary",
};

const carlito = Carlito({
	weight: ["400", "700"],
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={carlito.className}>
				<Providers>{children}</Providers>
				<Script src="https://telegram.org/js/telegram-web-app.js" />
			</body>
		</html>
	);
}
