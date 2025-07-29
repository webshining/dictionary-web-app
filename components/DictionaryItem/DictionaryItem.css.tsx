import { secondaryBackground } from "@/app/vars.css";
import { style } from "@vanilla-extract/css";

export const item = style({
	width: "100%",
	height: "100%",

	display: "grid",
	gridTemplateColumns: "1fr auto",
	alignItems: "center",
	gap: "10px",

	backgroundColor: secondaryBackground,
	borderRadius: "10px",
});

export const text = style({
	width: "100%",
	height: "100%",

	display: "flex",
	alignItems: "center",
	paddingLeft: "10px",

	cursor: "pointer",
});

export const button = style({
	cursor: "pointer",
	marginRight: "10px",
});
