import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
	env: {
		API_URL: "http://localhost:4000/api",
	},
	reactStrictMode: false,
};

export default withVanillaExtract(nextConfig);
