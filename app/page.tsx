import WordItem from "@/components/WordItem";
import { getMyWords } from "@/lib/words";

const page = async () => {
	const words = await getMyWords();

	return (
		<div className="flex flex-col gap-2 p-2 pb-0">
			{words.map((word) => (
				<WordItem key={word.id} word={word} />
			))}
		</div>
	);
};

export default page;
