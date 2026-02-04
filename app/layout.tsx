import { Montserrat_Alternates } from "next/font/google";
import Script from "next/script";

import Providers from "@/components/Providers";

const montserrat = Montserrat_Alternates({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	subsets: ["cyrillic", "latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<Providers>{children}</Providers>

				<Script src="https://telegram.org/js/telegram-web-app.js?59" />
			</body>
		</html>
	);
}
