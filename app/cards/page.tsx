import Card from "@/components/Card";
import LanguageSelector from "@/components/LanguageSelector";
import { generateMyCards } from "@/lib/cards";
import { getMyLanguages } from "@/lib/languages";
import type { LanguageType } from "@/types/language";
import { cookies } from "next/headers";

const page = async () => {
	const { get } = await cookies();

	const languages = await getMyLanguages();

	const selectedLanguageId = await get("language");
	let selectedLanguage: LanguageType | undefined;
	if (selectedLanguageId) {
		selectedLanguage = languages.find((l) => String(l.id) === selectedLanguageId.value);
	} else {
		selectedLanguage = languages.at(0);
	}

	const cards = await generateMyCards();

	return (
		<div className="relative w-full h-full grid grid-rows-[1fr_auto] items-center justify-center">
			<Card cards={cards} selectedLanguage={selectedLanguage} />
			<LanguageSelector languages={languages} selectedLanguage={selectedLanguage} />
		</div>
	);
};

export default page;
