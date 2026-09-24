import Card from "@/components/Card";
import LanguageSelector from "@/components/LanguageSelector";
import { getMyLanguages } from "@/lib/languages";
import { getMyRandomWord } from "@/lib/words";
import type { LanguageType } from "@/types/language";
import { cookies } from "next/headers";

const page = async () => {
	const { get, set } = await cookies();

	const word = await getMyRandomWord();
	const languages = await getMyLanguages();

	const selectedId = await get("language");
	let selected: LanguageType | undefined;
	if (selectedId) {
		selected = languages.find((l) => String(l.id) === selectedId.value);
	} else {
		selected = languages.at(0);
	}

	return (
		<div className="relative w-full h-full grid grid-rows-[1fr_auto] items-center justify-center">
			{word && <Card word={word} />}
			<LanguageSelector
				languages={languages}
				selected={selected}
				setSelected={async (id: number) => {
					await set("language", String(id));
				}}
			/>
		</div>
	);
};

export default page;
