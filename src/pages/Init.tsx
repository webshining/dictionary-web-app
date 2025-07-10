import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { host } from "../api";

const Init = () => {
	const [authorized, setAuthorized] = useState<boolean>(false);
	useEffect(() => {
		const hash = window.location.hash.slice(1);
		const params = new URLSearchParams(hash);
		const tgWebAppData = params.get("tgWebAppData");
		host.post("/init", { tgWebAppData }).then(({ data }) => {
			if (data.message == "Success") {
				setAuthorized(true);
			}
		});
	}, []);
	return authorized ? <Navigate to="/dictionaries" replace /> : <>Goida</>;
};

export default Init;
