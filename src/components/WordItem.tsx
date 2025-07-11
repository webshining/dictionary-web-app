import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { host } from "../api";
import Button from "../elements/Button";
import { Word } from "../types/dictionary";

const WordItem = ({ word, id }: { word: Word; id: number }) => {
	const ref = useRef<HTMLDivElement>(null);
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async () => {
			await host.delete(`/dictionaries/${id}/words/${word.id}`);
		},
	});
	const deleteWord = () => {
		ref.current?.classList.add("animate-disappearance", "remove");
		mutation.mutate();

		setTimeout(() => {
			queryClient.invalidateQueries({ queryKey: ["words"] });
		}, 200);
	};
	return (
		<div
			className="word__content w-full h-[65px] flex justify-between items-center gap-[10px] bg-[var(--tg-theme-secondary-bg-color)] rounded-[10px] px-[10px] animate-appearance"
			ref={ref}
		>
			<div className="word__word">
				{word.word}
				<br />
				{word.translation}
			</div>
			<Button>
				<MdDeleteOutline onClick={deleteWord} />
			</Button>
		</div>
	);
};

export default WordItem;
