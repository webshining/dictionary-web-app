import Card from "@/components/Card";
import LanguageSelector from "@/components/LanguageSelector";
import { generateMyCards } from "@/lib/cards";
import { getMyLanguages } from "@/lib/languages";
import { getMyRandomWord } from "@/lib/words";
import type { LanguageType } from "@/types/language";
import { cookies } from "next/headers";

const page = async () => {
	const { get } = await cookies();

	const word = await getMyRandomWord();
	const languages = await getMyLanguages();

	const selectedId = await get("language");
	let selected: LanguageType | undefined;
	if (selectedId) {
		selected = languages.find((l) => String(l.id) === selectedId.value);
	} else {
		selected = languages.at(0);
	}

	const cards = await generateMyCards();

	return (
		<div className="relative w-full h-full grid grid-rows-[1fr_auto] items-center justify-center">
			{word && <Card word={word} selectedLanguage={selected} />}
			<LanguageSelector languages={languages} selectedLanguage={selected} />
		</div>
	);
};

export default page;
