import { style } from "@vanilla-extract/css";
import { primaryBackground, secondaryBackground } from "./../../app/vars.css";

export const selector = style({});

export const selectorContent = style({
	height: "100%",
	width: "100%",

	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	gap: "5px",

	cursor: "pointer",
});

export const button = style({
	fontSize: "1rem",
});

export const selectorItemsWrapper = style({
	display: "none",

	position: "fixed",
	top: "0",
	left: "0",

	width: "100%",
	height: "100%",
	padding: "10px",

	background: primaryBackground,
});

export const selectorItems = style({
	width: "100%",
	height: "100%",
	overflowY: "auto",

	display: "grid",
	gridAutoRows: "50px",
	gap: "10px",

	WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0))",
	WebkitMaskRepeat: "no-repeat",
	WebkitMaskSize: "100% 100%",
	maskImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0))",
	maskRepeat: "no-repeat",
	maskSize: "100% 100%",
});

export const selectorItem = style({
	width: "100%",
	height: "100%",

	display: "flex",
	alignItems: "center",

	padding: "10px 5px",
	borderRadius: "6px",
	cursor: "pointer",
	border: `2px solid ${secondaryBackground}`,
	":hover": {},
});
