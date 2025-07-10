import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router";
import { host } from "../api";
import { Dictionary } from "../types/dictionary";

const DictionaryItem = (dictionary: Dictionary) => {
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			await host.delete(`/dictionaries/${id}`);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dictionaries"] }),
	});
	const ref = useRef<HTMLDivElement>(null);

	const deleteDictionary = () => {
		ref.current?.classList.add("disappearance");

		setTimeout(() => {
			mutation.mutate({ id: dictionary.id });
		}, 200);
	};
	return (
		<div key={dictionary.id} className="dictionary__content" ref={ref}>
			<NavLink className="dictionary__name" to={"/dictionaries/" + dictionary.id} end>
				{dictionary.name}
			</NavLink>
			<div className="dictionary__button">
				<MdDeleteOutline onClick={deleteDictionary} />
			</div>
		</div>
	);
};

export default DictionaryItem;
