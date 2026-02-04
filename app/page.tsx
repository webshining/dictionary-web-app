import { Trash } from "lucide-react";

import { getWords } from "@/lib/api";
import { Content, TranslationItem, WordItem } from "./page.css";

const page = async () => {
	const words = await getWords();

	return (
		<Content>
			{words?.map((word) => (
				<WordItem key={word.id}>
					<div>
						{word.translations.map((translation) => (
							<TranslationItem key={translation.id}>
								<div className="language">{translation.language}</div>
								<div className="translation">{translation.translation}</div>
							</TranslationItem>
						))}
					</div>
					<button type="button">
						<Trash size={25} strokeWidth={2} absoluteStrokeWidth />
					</button>
				</WordItem>
			))}
		</Content>
	);
};

export default page;
