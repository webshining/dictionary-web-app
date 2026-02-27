"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useEffect } from "react";

import { deleteWord, getWords } from "@/lib/api";
import { Content, TranslationItem, WordItem } from "./Words.css";

const Words = () => {
	const queryClient = useQueryClient();

	const { data, error, isSuccess, isError } = useQuery({
		queryKey: ["words"],
		queryFn: getWords,
		retry: false,
	});
	const { mutate } = useMutation({
		mutationFn: (id: number) => deleteWord(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["words"] }),
	});

	useEffect(() => {
		if (isError) {
			return (window as any).Telegram.WebApp.close();
		}
	}, [isError]);

	return (
		<Content>
			{isSuccess &&
				data.map((word) => (
					<WordItem key={word.id}>
						<div>
							{word.translations.map((translation) => (
								<TranslationItem key={translation.id}>
									<div className="language">{translation.language}</div>
									<div className="translation">{translation.translation}</div>
								</TranslationItem>
							))}
						</div>
						<button type="button" onClick={() => mutate(word.id)}>
							<Trash size={25} strokeWidth={2} absoluteStrokeWidth />
						</button>
					</WordItem>
				))}
		</Content>
	);
};

export default Words;
