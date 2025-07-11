import { useNavigate } from "react-router";

export const useRedirect = () => {
	const navigate = useNavigate();
	const redirect = (path: string | null = null) => {
		document.querySelectorAll(".animate-appearance").forEach((e) => {
			e.classList.add("animate-disappearance");
		});
		setTimeout(() => {
			if (path) navigate(path);
			else navigate(-1);
		}, 200);
	};

	return redirect;
};
