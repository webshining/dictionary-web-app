"use client";

import useLanguage from "@/store/language";
import clsx from "clsx";
import { memo, useState } from "react";

const LanguageSelector = () => {
	const [active, setActive] = useState(false);

	const { languages, selected, setSelected } = useLanguage();

	const onSelected = (id: number) => {
		setActive(false);
		setSelected(id);
	};

	return (
		<div className="relative justify-self-center z-999999">
			<button type="button" className="p-1 px-3 rounded-xl glass" onClick={() => setActive(!active)}>
				{selected?.display}
			</button>
			<ul
				className={clsx(
					"p-2 px-4 absolute bottom-[calc(100%+4px)] origin-bottom left-1/2 -translate-x-1/2 w-70 flex flex-col gap-2 rounded-xl transition-all duration-100 ease-in-out glass",
					!active && "scale-60 opacity-0 pointer-events-none",
				)}
			>
				{languages
					.filter((l) => l.id !== selected?.id)
					.map((l) => (
						<li key={l.id}>
							<button type="button" className="w-full text-start" onClick={() => onSelected(l.id)}>
								{l.display}
							</button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default memo(LanguageSelector);
