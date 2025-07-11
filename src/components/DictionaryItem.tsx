import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { host } from "../api";
import Button from "../elements/Button";
import { useRedirect } from "../services";
import { Dictionary } from "../types/dictionary";

const DictionaryItem = ({ dictionary }: { dictionary: Dictionary }) => {
	const redirect = useRedirect();
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async () => {
			await host.delete(`/dictionaries/${dictionary.id}`);
		},
	});
	const ref = useRef<HTMLDivElement>(null);

	const deleteDictionary = () => {
		ref.current?.classList.add("animate-disappearance", "remove");
		mutation.mutate();

		setTimeout(() => {
			queryClient.invalidateQueries({ queryKey: ["dictionaries"] });
		}, 200);
	};
	return (
		<div
			className="dictionary__content w-full h-[65px] flex justify-between items-center gap-[10px] bg-[var(--tg-theme-secondary-bg-color)] rounded-[10px] animate-appearance"
			ref={ref}
		>
			<div
				className="cursor-pointer flex-1 h-full flex items-center pl-[10px]"
				onClick={() => redirect(`/dictionaries/${dictionary.id}`)}
			>
				{dictionary.name}
			</div>
			<Button className="pr-[10px]">
				<MdDeleteOutline onClick={deleteDictionary} />
			</Button>
		</div>
	);
};

export default DictionaryItem;
