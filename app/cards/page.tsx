import Card from "@/components/Card";
import LanguageSelector from "@/components/LanguageSelector";
import { getMyRandomWord } from "@/lib/words";

const page = async () => {
	const word = await getMyRandomWord();

	return (
		<div className="relative w-full h-full grid grid-rows-[1fr_auto] items-center justify-center">
			<Card word={word} />
			<LanguageSelector />
		</div>
	);
};

export default page;
