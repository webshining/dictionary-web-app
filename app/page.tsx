import { Words } from "@/types/word";
import { cookies } from "next/headers";

const page = async () => {
	const cookiesStore = await cookies();
	const response = await fetch("http://localhost:4000/api/words", {
		headers: { Authorization: `Bearer ${cookiesStore.get("session").value}` },
	});
	const words = Words.parse(await response.json());
	return (
		<div className="flex flex-col gap-2">
			{words.map((w) => (
				<div key={w.id} className="p-2 flex flex-col gap-2 rounded-xl glass">
					<div className="flex items-center justify-between">
						<div>{w.translations[0].translation}</div>
						<div>{w.translations[0].language}</div>
					</div>
					<div className="p-2 rounded-lg glass">
						{w.translations.slice(1).map((t) => (
							<div key={`${w.id}:${t.language}`} className="flex items-center justify-between">
								<div>{t.translation}</div>
								<div>{t.language}</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default page;
