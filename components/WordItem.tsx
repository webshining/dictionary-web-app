"use client";

import { removeWord } from "@/lib/words";
import useWordsStore from "@/store/words";
import type { WordType } from "@/types/word";
import { motion, type PanInfo, useAnimation, useMotionValue } from "framer-motion";
import { Shredder } from "lucide-react";

const WordItem = ({ word }: { word: WordType }) => {
	const removeStoreWord = useWordsStore((state) => state.removeWord);

	const controls = useAnimation();
	const x = useMotionValue(0);

	const handleDragEnd = (_e: any, info: PanInfo) => {
		const currentX = x.get();
		const velocityX = info.velocity.x;

		if (currentX <= -40 || velocityX < -500) {
			controls.start({
				x: -56,
				transition: { type: "spring", stiffness: 400, damping: 30 },
			});
		} else {
			controls.start({
				x: 0,
				transition: { type: "spring", stiffness: 400, damping: 30 },
			});
		}
	};

	const onRemove = async (id: number) => {
		removeStoreWord(id);
		controls.start({
			x: 0,
			transition: { type: "spring", stiffness: 400, damping: 30 },
		});
		await removeWord(id);
	};

	return (
		<motion.div layout exit={{ opacity: 0, left: -100 }} className="relative">
			<motion.div
				className="relative flex flex-col gap-2 p-2 bg-background border border-foreground rounded-xl z-10"
				drag="x"
				dragConstraints={{ left: -56, right: 0 }}
				dragElastic={0.1}
				style={{ x }}
				animate={controls}
				onDragEnd={handleDragEnd}
				whileTap={{ cursor: "grabbing" }}
			>
				{word.translations.map((t) => (
					<div key={`${word.id}:${t.language.id}`} className="flex items-center justify-between">
						<div>{t.translation}</div>
						<div>{t.language.display}</div>
					</div>
				))}
			</motion.div>
			<div className="absolute w-full h-full left-0 top-0 flex justify-end items-center p-4 bg-accent text-background rounded-xl z-1">
				<button type="button" onClick={() => onRemove(word.id)}>
					<Shredder />
				</button>
			</div>
		</motion.div>
	);
};

export default WordItem;
