"use client";

import { host } from "@/lib/axios";
import { createDictionariesStore, DictionariesStoreContext } from "@/stores/dictionaries";
import { useEffect, useState } from "react";

const dictionariesStore = createDictionariesStore();

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [authorized, setAuthorized] = useState<boolean>(false);

	useEffect(() => {
		if (window.location.hash) {
			const hash = window.location.hash.slice(1);
			const params = new URLSearchParams(hash);
			const tgWebAppData = params.get("tgWebAppData");
			host.post("/init/", { tgWebAppData }).then(({ data }) => {
				if (data.message == "Success") {
					setAuthorized(true);
				}
			});
		} else {
			setAuthorized(true);
		}
	}, []);

	return (
		authorized && (
			<DictionariesStoreContext.Provider value={dictionariesStore}>{children}</DictionariesStoreContext.Provider>
		)
	);
};

export default Providers;
