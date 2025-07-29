import { globalStyle } from "@vanilla-extract/css";
import { primaryText, secondaryBackground } from "./vars.css";

globalStyle(":root", {
	vars: {
		[primaryText]: "var(--tg-theme-text-color)",
		[secondaryBackground]: "var(--tg-theme-secondary-bg-color)",
	},
});

globalStyle("*", {
	margin: 0,
	padding: 0,
	boxSizing: "border-box",
	overflow: "hidden",
	userSelect: "none",
	scrollbarWidth: "none",
	fontSize: "inherit",
});

globalStyle("input", {
	color: "unset",
	backgroundColor: "unset",
	border: "none",
	outline: "none",
	fontFamily: "inherit",
});

globalStyle("a", {
	textDecoration: "none",
	color: "inherit",
});

globalStyle("body", {
	width: "100dvw",
	height: "100dvh",
	color: primaryText,
});

globalStyle("svg", {
	fontSize: "1.5rem",
});
