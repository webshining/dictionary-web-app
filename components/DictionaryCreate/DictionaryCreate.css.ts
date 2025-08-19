import { secondaryBackground } from "@/app/vars.css";
import { style } from "@vanilla-extract/css";

export const form = style({
	width: "100%",
	height: "100%",

	display: "flex",
	gap: "10px",

	borderRadius: "10px",
	padding: "0 10px",
	backgroundColor: secondaryBackground,
});

export const input = style({
	flexGrow: 1,
});
