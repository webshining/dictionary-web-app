"use client";

import clsx from "clsx";
import { useCallback, useRef, useState } from "react";

const page = () => {
	const [active, setActive] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [moving, setMoving] = useState(false);

	const card = useRef<HTMLDivElement>(null);
	const start = useRef(0);

	const startDragging = (e: React.PointerEvent<HTMLDivElement>) => {
		if (active) return;
		start.current = e.clientX;
		setDragging(true);
	};

	const onDragging = useCallback(
		(e: React.PointerEvent<HTMLDivElement>) => {
			if (!dragging || !card.current) return;
			const rotate = e.clientX - start.current;
			if (Math.abs(rotate) > 5 || moving) {
				if (!moving) setMoving(true);
				card.current.style.transform = `translateX(${rotate}px) rotate(${rotate / 15}deg)`;
			}
		},
		[dragging, moving],
	);

	const stopDragging = (e: React.PointerEvent<HTMLDivElement>) => {
		start.current = 0;
		card.current!.style.transform = "";
		setDragging(false);
		setTimeout(() => setMoving(false), 300);
	};

	return (
		<div className="w-full h-full flex items-center justify-center">
			<div
				ref={card}
				className="relative w-80 aspect-3/4 perspective-[1400px]"
				style={{ transform: `` }}
				onPointerDown={startDragging}
				onPointerMove={onDragging}
				onPointerUp={stopDragging}
			>
				<div className="absolute left-1/2 bottom-10 -translate-x-1/2 text-4xl">тест</div>
				<button
					type="button"
					className={clsx(
						"w-full h-full rounded-2xl flex items-center justify-center origin-top text-4xl transition-all duration-300 glass",
						active && "rotate-x-45",
					)}
					onClick={() => !moving && setActive(!active)}
				>
					test
				</button>
			</div>
		</div>
	);
};

export default page;
