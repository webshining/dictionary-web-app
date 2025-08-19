import { useDictionariesStore } from "@/stores/dictionaries";
import { Dictionary } from "@/types/dictionary";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";
import { button, item, text } from "./DictionaryItem.css";

const DictionaryItem = ({ dictionary }: { dictionary: Dictionary }) => {
	const { removeDictionary } = useDictionariesStore((store) => store);
	return (
		<div className={item}>
			<Link href={`/dictionaries/${dictionary.id}`} className={text}>
				{dictionary.name}
			</Link>
			<MdDeleteOutline className={button} onClick={() => removeDictionary(dictionary.id)} />
		</div>
	);
};

export default DictionaryItem;
