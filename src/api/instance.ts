import axios from "axios";

export const host = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
});
host.interceptors.request.use((config) => {
	config.headers["ngrok-skip-browser-warning"] = "69420";
	return config;
});
