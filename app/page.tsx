import Words from "@/components/Words/Words";
import { getWords } from "@/lib/api";

const page = async () => {
	const words = await getWords();

	return <Words words={words} />;
};

export default page;
