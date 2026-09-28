import Words from "@/components/Words";
import { getMyWords } from "@/lib/words";

const page = async () => {
	const words = await getMyWords();

	console.log("words rerended");

	return <Words words={words} />;
};

export default page;
