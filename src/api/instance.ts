import axios from "axios";

const getCookie = (name: string) => {
	const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
	return cookies ? cookies.split("=")[1] : null;
};
export const host = axios.create({
	baseURL: process.env.API_URL,
	withCredentials: true,
});
host.interceptors.request.use((config) => {
	const token = getCookie("csrftoken");
	if (token) {
		config.headers["X-CSRFToken"] = token;
	}
	return config;
});
