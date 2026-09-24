import { getMyWords } from "@/lib/words";

const page = async () => {
	const words = await getMyWords();

	return (
		<div className="flex flex-col gap-2 p-2 pb-0">
			{words.map((w) => (
				<div key={w.id} className="p-2 flex flex-col gap-2 border border-foreground rounded-xl">
					<div className="flex items-center justify-between">
						<div>{w.translations[0].translation}</div>
						<div>{w.translations[0].language.display}</div>
					</div>
					<div className="p-2 rounded-lg">
						{w.translations.slice(1).map((t) => (
							<div key={`${w.id}:${t.language.id}`} className="flex items-center justify-between">
								<div>{t.translation}</div>
								<div>{t.language.display}</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default page;
