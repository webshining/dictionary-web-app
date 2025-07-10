import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { host } from "../api";

const HashProvider = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const [authorized, setAuthorized] = useState<boolean>(false);
	useEffect(() => {
		if (window.location.hash) {
			const hash = window.location.hash.slice(1);
			const params = new URLSearchParams(hash);
			const tgWebAppData = params.get("tgWebAppData");
			host.post("/init", { tgWebAppData }).then(({ data }) => {
				if (data.message == "Success") {
					setAuthorized(true);
					navigate(window.location.pathname + window.location.search, { replace: true });
				}
			});
		} else {
			setAuthorized(true);
		}
	}, []);
	return authorized ? <>{children}</> : <>Дядя гуляй</>;
};

export default HashProvider;
