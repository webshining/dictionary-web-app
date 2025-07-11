import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { host } from "../api";
import { Word } from "../types/dictionary";

const Cards = () => {
	const [words, setWords] = useState<Word[]>([]);
	const { id } = useParams();

	const query = useQuery({
		queryKey: ["cards", id],
		queryFn: async () => (await host.get(`/dictionaries/${id}`)).data,
	});

	useEffect(() => {
		if (query.data && "dictionary" in query.data) {
			setWords(query.data.dictionary.words);
		}
	}, [query.data]);

	const card = useRef<HTMLDivElement>(null);
	const cardBack = useRef<HTMLDivElement>(null);
	const cardFront = useRef<HTMLDivElement>(null);
	const variantNo = useRef<HTMLDivElement>(null);
	const variantYes = useRef<HTMLDivElement>(null);

	let move = false;
	let drag = false;
	let active = false;
	let offset = 0;
	let start = 0;

	const onDragStart = (e: any) => {
		if (active) return;
		start = getOffsetX(e);
		drag = true;

		card.current!.style.transition = "none";
		variantNo.current!.style.transition = "none";
		variantYes.current!.style.transition = "none";
	};

	const onDragMove = (e: any) => {
		if (!drag || active) return;
		const offsetX = getOffsetX(e);
		if (Math.abs(offsetX) > 5 || move) {
			if (!move) move = true;
			card.current!.style.transform = `translateX(${offsetX}px) rotate(${offsetX / 15}deg)`;
			offset = offsetX;
			if (offsetX > 0) {
				variantNo.current!.style.opacity = "1";
				variantNo.current!.style.transform = `translateX(${Math.max(-offsetX, -125)}px)`;
				variantYes.current!.style.opacity = "";
				variantYes.current!.style.transform = "";
			} else if (offsetX < 0) {
				variantNo.current!.style.opacity = "";
				variantNo.current!.style.transform = "";
				variantYes.current!.style.opacity = "1";
				variantYes.current!.style.transform = `translateX(${Math.min(-offsetX, 125)}px)`;
			} else {
				variantNo.current!.style.opacity = "";
				variantNo.current!.style.transform = "";
				variantYes.current!.style.opacity = "";
				variantYes.current!.style.transform = "";
			}
		}
	};

	const onDragEnd = (e: any) => {
		card.current!.style.transition = "";
		card.current!.style.transform = "";
		variantNo.current!.style.opacity = "";
		variantNo.current!.style.transform = "";
		variantNo.current!.style.transition = "";
		variantYes.current!.style.opacity = "";
		variantYes.current!.style.transform = "";
		variantYes.current!.style.transition = "";

		processCard();

		offset = 0;
		start = 0;
		drag = false;
		setTimeout(() => {
			move = false;
		}, 300);
	};

	const processCard = () => {
		let know = undefined;
		if (offset < -100) {
			know = true;
		} else if (offset > 100) {
			know = false;
		}

		const word_id = card.current?.getAttribute("data-id");
		if (word_id && know !== undefined) {
			setWords((prev) => prev.filter((w) => w.id !== Number(word_id)));
		}

		if (words.length > 1) {
			const next = words[1];
			card.current!.setAttribute("data-id", String(next.id));
			cardFront.current!.innerHTML = `${next.translation}`;
			cardBack.current!.innerHTML = `<span>${next.word}</span>`;
		} else {
			card.current!.removeAttribute("data-id");
			cardFront.current!.innerHTML = `That's all`;
			cardBack.current!.innerHTML = `<span>На этом все</span>`;
		}
	};

	const getOffsetX = (e: any) => {
		if (e.touches && e.touches.length > 0) {
			return e.touches[0].clientX - start;
		} else if (e.changedTouches && e.changedTouches.length > 0) {
			return e.changedTouches[0].clientX - start;
		} else {
			return e.clientX - start;
		}
	};

	const onClick = () => {
		if (move) return;
		active = !active;
		card.current!.classList.toggle("active");
	};

	useEffect(() => {
		if (
			!card.current ||
			!cardFront.current ||
			!cardBack.current ||
			!variantNo.current ||
			!variantYes.current ||
			!words.length
		)
			return;

		processCard();

		document.addEventListener("mousemove", onDragMove);
		document.addEventListener("mouseup", onDragEnd);
		document.addEventListener("touchmove", onDragMove);
		document.addEventListener("touchend", onDragEnd);

		return () => {
			document.removeEventListener("mousemove", onDragMove);
			document.removeEventListener("mouseup", onDragEnd);
			document.removeEventListener("touchmove", onDragMove);
			document.removeEventListener("touchend", onDragEnd);
		};
	}, [words.length]);

	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="variants">
				<div className="variants__no" ref={variantNo}>
					Don't know
				</div>
				<div className="variants__yes" ref={variantYes}>
					Know
				</div>
			</div>
			{words.length !== 0 && (
				<div className="card" ref={card} onClick={onClick} onMouseDown={onDragStart} onTouchStart={onDragStart}>
					<div className="card__back overflow-auto" ref={cardBack}></div>
					<div className="card__front" ref={cardFront}></div>
				</div>
			)}
		</div>
	);
};

export default Cards;
