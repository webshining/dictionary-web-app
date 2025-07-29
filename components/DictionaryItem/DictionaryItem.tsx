import { Dictionary } from "@/types/dictionary";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";
import { button, item, text } from "./DictionaryItem.css";

const DictionaryItem = ({ dictionary }: { dictionary: Dictionary }) => {
	return (
		<div className={item}>
			<Link href={`/dictionaries/${dictionary.id}`} className={text}>
				{dictionary.name}
			</Link>
			<MdDeleteOutline className={button} />
		</div>
	);
};

export default DictionaryItem;
