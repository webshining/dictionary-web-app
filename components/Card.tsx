"use client";

import useLanguage from "@/store/language";
import type { WordType } from "@/types/word";
import clsx from "clsx";
import { motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";

const Card = ({ word }: { word: WordType }) => {
	const selected = useLanguage((s) => s.selected);

	const [active, setActive] = useState(false);
	const [moving, setMoving] = useState(false);
	const [dragging, setDragging] = useState(false);

	const x = useMotionValue(0);
	const rotate = useTransform(x, (v) => v / 15);

	useMotionValueEvent(x, "change", (latest) => {
		if (!dragging && Math.abs(latest) < 0.5) {
			setMoving(false);
		}
	});

	return (
		<motion.div
			className="relative w-80 aspect-3/4 perspective-[1400px]"
			style={{ x, rotate }}
			drag={active ? false : "x"}
			dragElastic={0.5}
			dragConstraints={{ left: 0, right: 0 }}
			onDragStart={() => {
				setDragging(true);
				setMoving(true);
			}}
			onDragEnd={() => {
				setDragging(false);
				x.set(0);
			}}
			onAnimationComplete={() => setMoving(false)}
		>
			<div className="absolute bottom-5 w-full text-center text-2xl gap-2">
				{selected &&
					word.translations
						.filter((t) => t.language.id !== selected.id)
						.map((t) => t.translation)
						.join(", ")}
			</div>

			<motion.button
				type="button"
				className={clsx(
					"relative w-full h-full rounded-2xl flex items-center justify-center origin-top text-4xl transition-transform duration-300 ease-in-out glass",
					active && "rotate-x-45",
				)}
				style={{
					background: useTransform(x, (offset) => {
						return `
								linear-gradient(
									${offset > 0 ? offset : Math.abs(offset) + 180}deg,
									${offset > 0 ? `rgba(34,197,94,.35), rgba(20, 20, 20, 0.28) ${Math.abs(offset)}%` : `rgba(239,68,68,.35), rgba(20, 20, 20, 0.28) ${Math.abs(offset)}%`}
								)
							`;
					}),
				}}
				onClick={() => !moving && setActive((v) => !v)}
			>
				{selected && word.translations.find((t) => t.language.id === selected.id)?.translation}
			</motion.button>
		</motion.div>
	);
};

export default Card;
