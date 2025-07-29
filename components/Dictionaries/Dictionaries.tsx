import { Dictionary } from "@/types/dictionary";
import DictionaryItem from "../DictionaryItem/DictionaryItem";
import { items } from "./Dictionaries.css";

const Dictionaries = ({ dictionaries }: { dictionaries: Dictionary[] }) => {
	return (
		<div className={items}>
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			{dictionaries.map((dictionary) => (
				<DictionaryItem key={dictionary.id} dictionary={dictionary} />
			))}
			<div></div>
		</div>
	);
};

export default Dictionaries;
