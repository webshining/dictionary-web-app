"use client";

import { host } from "@/lib/axios";
import { useEffect, useState } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [authorized, setAuthorized] = useState<boolean>(false);
	useEffect(() => {
		if (window.location.hash) {
			const hash = window.location.hash.slice(1);
			const params = new URLSearchParams(hash);
			const tgWebAppData = params.get("tgWebAppData");
			host.post("/init", { tgWebAppData }).then(({ data }) => {
				if (data.message == "Success") {
					setAuthorized(true);
				}
			});
		} else {
			setAuthorized(true);
		}
	}, []);
	return authorized && children;
};

export default Providers;
