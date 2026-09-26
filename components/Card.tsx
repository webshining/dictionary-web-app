"use client";

import clsx from "clsx";
import { motion, type PanInfo, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";
import type { LanguageType } from "@/types/language";
import type { WordType } from "@/types/word";

const Card = ({ word, selectedLanguage }: { word: WordType; selectedLanguage?: LanguageType }) => {
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

	const handleDragStart = () => {
		setDragging(true);
		setMoving(true);
	};

	const handleDragEnd = (_e: any, info: PanInfo) => {
		setDragging(false);
		x.set(0);

		const currentX = x.get();
		if (Math.abs(currentX) >= 180 || Math.abs(info.velocity.x) > 500) {
			
		}
	};

	return (
		<motion.div
			className="relative w-80 aspect-3/4 perspective-[1400px]"
			style={{ x, rotate }}
			drag={active ? false : "x"}
			dragElastic={0.5}
			dragConstraints={{ left: 0, right: 0 }}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onAnimationComplete={() => setMoving(false)}
		>
			<div className="absolute bottom-5 w-full text-center text-2xl gap-2">
				{selectedLanguage &&
					word.translations
						.filter((t) => t.language.id !== selectedLanguage.id)
						.map((t) => t.translation)
						.join(", ")}
			</div>

			<motion.button
				type="button"
				className={clsx(
					"relative w-full h-full rounded-2xl flex items-center justify-center origin-top text-4xl transition-transform duration-300 ease-in-out text-background",
					active && "rotate-x-45",
				)}
				style={{
					background: useTransform(x, (offset) => {
						return `
								linear-gradient(
									${offset > 0 ? offset : Math.abs(offset) + 180}deg,
									${offset > 0 ? `#72ce95, var(--color-foreground) ${Math.abs(offset)}%` : `#e78a8a, var(--color-foreground) ${Math.abs(offset)}%`}
								)
							`;
					}),
				}}
				onClick={() => !moving && setActive((v) => !v)}
			>
				{selectedLanguage && word.translations.find((t) => t.language.id === selectedLanguage.id)?.translation}
			</motion.button>
		</motion.div>
	);
};

export default Card;
