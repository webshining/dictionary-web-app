import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { host } from "../api";

const HashProvider = () => {
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
	return authorized ? <Outlet /> : null;
};

export default HashProvider;
