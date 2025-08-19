import { host } from "@/lib/axios";
import { Language } from "@/types/dictionary";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
	button,
	selector,
	selectorContent,
	selectorItem,
	selectorItems,
	selectorItemsWrapper,
} from "./LanguageSelector.css";

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
	selected: string;
	onSelect: (code: string) => void;
}

const LanguageSelector = ({ selected, onSelect, ...props }: Props) => {
	const [active, setActive] = useState<boolean>(false);
	const [languages, setLanguages] = useState<Language[]>([]);
	useEffect(() => {
		host.get("/languages/").then(({ data }) => {
			if (data && data instanceof Array) {
				setLanguages(data);
			}
		});
	}, []);
	const OnSelect = (code: string) => {
		onSelect(code);
		setActive(false);
	};
	return (
		<div {...props} className={selector}>
			<div className={selectorContent} onClick={() => setActive(!active)}>
				<div>{selected}</div>
				<IoIosArrowDown className={button} />
			</div>
			<div className={selectorItemsWrapper} style={{ display: active ? "grid" : "none" }}>
				<div className={clsx(selectorItems)}>
					{languages.map((l) => (
						<div className={selectorItem} key={l.code} onClick={() => OnSelect(l.code)}>
							{l.name}
						</div>
					))}
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default LanguageSelector;
