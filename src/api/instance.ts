import axios from "axios";

const getCookie = (name: string) => {
	const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
	return cookies ? cookies.split("=")[1] : null;
};
export const host = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
});
host.interceptors.request.use((config) => {
	const token = getCookie("csrftoken");
	if (token) {
		config.headers["X-CSRFToken"] = token;
		config.headers["ngrok-skip-browser-warning"] = "69420";
	}
	return config;
});
