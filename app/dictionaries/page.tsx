"use client";

import Dictionaries from "@/components/Dictionaries/Dictionaries";
import DictionaryCreate from "@/components/DictionaryCreate/DictionaryCreate";
import { host } from "@/lib/axios";
import { Dictionary } from "@/types/dictionary";
import { useEffect, useState } from "react";
import { content, form, items } from "./page.css";

const page = () => {
	const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);
	useEffect(() => {
		host.get("/dictionaries").then(({ data }) => {
			// if dictionaries in data
			if (data && data.dictionaries) {
				setDictionaries(data.dictionaries);
			}
		});
	}, []);
	return (
		<div className={content}>
			<div className={items}>
				<Dictionaries dictionaries={dictionaries} />
			</div>
			<div className={form}>
				<DictionaryCreate />
			</div>
		</div>
	);
};

export default page;
