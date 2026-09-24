"use client";

import { saveLanguage } from "@/lib/languages";
import type { LanguageType } from "@/types/language";
import clsx from "clsx";
import { memo, useState } from "react";

const LanguageSelector = ({
	languages,
	selectedLanguage,
}: {
	languages: LanguageType[];
	selectedLanguage?: LanguageType;
}) => {
	const [active, setActive] = useState(false);
	const [selected, setSelected] = useState<LanguageType | null>(selectedLanguage || null);

	const onSelected = async (language: LanguageType) => {
		setActive(false);
		setSelected(language);
		await saveLanguage(language.id);
	};

	return (
		<div className="relative justify-self-center z-999999">
			<button type="button" className="p-1 px-3 rounded-xl" onClick={() => setActive(!active)}>
				{selected?.display}
			</button>
			<ul
				className={clsx(
					"p-2 px-4 absolute bottom-[calc(100%+4px)] origin-bottom left-1/2 -translate-x-1/2 w-70 flex flex-col gap-2 border-b-2 border-foreground bg-background glass rounded-xl transition-all duration-100 ease-in-out",
					!active && "scale-60 opacity-0 pointer-events-none",
				)}
			>
				{languages
					.filter((l) => l.id !== selected?.id)
					.map((l) => (
						<li key={l.id}>
							<button type="button" className="w-full text-start" onClick={() => onSelected(l)}>
								{l.display}
							</button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default memo(LanguageSelector);
