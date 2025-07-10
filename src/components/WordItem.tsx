import { MdDeleteOutline } from "react-icons/md";
import { Word } from "../types/dictionary";

const WordItem = ({ word, id }: { word: Word; id: number }) => {
	return (
		<div className="word__content">
			<div className="word__word">
				{word.word}
				<br />
				{word.translation}
			</div>
			<div className="dictionary__button">
				<MdDeleteOutline />
			</div>
		</div>
	);
};

export default WordItem;
