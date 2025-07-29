import { style } from "@vanilla-extract/css";

export const content = style({
	width: "100%",
	height: "100%",

	display: "grid",
	gridTemplateRows: "1fr 45px",
	paddingBottom: "10px",
});

export const items = style({
	width: "100%",
	height: "100%",
	padding: "10px 10px 0",

	overflowY: "auto",
	flexGrow: 1,

	maskSize: "100% 100%",
	maskImage: "linear-gradient(to bottom, transparent, black 3%, black 85%, transparent)",
});

export const form = style({
	width: "100%",

	padding: "0 10px",
});
