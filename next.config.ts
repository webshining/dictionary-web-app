import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
	env: {
		API_URL: "https://api.webshining.space/api",
	},
	reactStrictMode: false,
};

export default withVanillaExtract(nextConfig);
