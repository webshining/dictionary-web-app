"use client";

import { reviewWord } from "@/lib/cards";
import useCardsStore from "@/store/cards";
import type { LanguageType } from "@/types/language";
import type { WordsType } from "@/types/word";
import clsx from "clsx";
import { motion, type PanInfo, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Card = ({ cards, selectedLanguage }: { cards: WordsType; selectedLanguage: LanguageType }) => {
	const [isHydrated, setIsHydrated] = useState(false);
	const { currentWord, cards: storeCards, setCards, next } = useCardsStore();
	useEffect(() => {
		setCards(cards);
		setIsHydrated(true);
	}, [cards, setCards]);

	const displayCard = isHydrated ? currentWord : cards.at(0);

	const [active, setActive] = useState(false);
	const [moving, setMoving] = useState(false);
	const [dragging, setDragging] = useState(false);

	const x = useMotionValue(0);
	const rotate = useTransform(x, (v) => v / 15);
	const background = useTransform(x, (offset) => {
		const absOffset = Math.abs(offset);
		return `linear-gradient( ${offset > 0 ? offset : absOffset + 180}deg, ${offset > 0 ? `#72ce95, var(--color-foreground) ${absOffset}%` : `#e78a8a, var(--color-foreground) ${absOffset}%`})`;
	});

	useMotionValueEvent(x, "change", (latest) => {
		if (!dragging && Math.abs(latest) < 0.5) {
			setMoving(false);
		}
	});

	const quality = useRef(5);
	const startTime = useRef(Date.now());
	const peeked = useRef(false);
	useEffect(() => {
		quality.current = 5;
		startTime.current = Date.now();
		peeked.current = false;
	}, [currentWord]);
	const handleDragStart = () => {
		setDragging(true);
		setMoving(true);
	};
	const handleDragEnd = async (_e: any, info: PanInfo) => {
		if (!currentWord) return;

		const currentX = x.get();
		const velocity = info.velocity.x;
		const isSwipeValid = Math.abs(currentX) >= 180 || Math.abs(velocity) > 500;

		if (isSwipeValid) {
			const timeSpent = (Date.now() - startTime.current) / 1000;
			const isRightSwipe = currentX > 0 || velocity > 500;

			if (isRightSwipe) {
				quality.current = timeSpent < 2 ? 5 : timeSpent < 4 ? 4 : 3;
				if (peeked.current) quality.current -= 1;
			} else {
				quality.current = 1;
				if (peeked.current) quality.current += 1;
			}
			await reviewWord(currentWord.id, quality.current);
			next();
		}

		setDragging(false);
		x.set(0);
	};
	const onPeek = () => {
		if (!moving) {
			peeked.current = true;
			setActive((v) => !v);
		}
	};

	return displayCard ? (
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
				{displayCard.words
					.filter((word) => word.language.id !== selectedLanguage.id)
					.map((word) => word.word)
					.join(", ")}
			</div>

			<motion.button
				type="button"
				className={clsx(
					"relative w-full h-full rounded-2xl flex items-center justify-center origin-top text-4xl transition-transform duration-300 ease-in-out text-background",
					active && "rotate-x-45",
				)}
				style={{
					background,
				}}
				onClick={onPeek}
			>
				{displayCard.words.find((word) => word.language.id === selectedLanguage.id)?.word}
			</motion.button>
		</motion.div>
	) : (
		<motion.div
			className="relative w-80 aspect-3/4 perspective-[1400px]"
			style={{ x, rotate }}
			drag={active ? false : "x"}
			dragElastic={0.5}
			dragConstraints={{ left: 0, right: 0 }}
			onDragStart={handleDragStart}
			onDragEnd={() => {
				setDragging(false);
				x.set(0);
			}}
			onAnimationComplete={() => setMoving(false)}
		>
			<div className="absolute bottom-5 w-full text-center text-2xl gap-2">There are no cards left.</div>

			<motion.button
				type="button"
				className={clsx(
					"relative w-full h-full rounded-2xl flex items-center justify-center origin-top text-4xl transition-transform duration-300 ease-in-out text-background",
					active && "rotate-x-45",
				)}
				style={{
					background,
				}}
				onClick={onPeek}
			>
				There are no cards left.
			</motion.button>
		</motion.div>
	);
};

export default Card;
