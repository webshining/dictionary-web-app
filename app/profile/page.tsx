"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const page = () => {
	const [picture, setPicture] = useState<string | null>(null);

	useEffect(() => {
		if (window.Telegram.WebApp.initDataUnsafe.user?.photo_url)
			setPicture(window.Telegram.WebApp.initDataUnsafe.user?.photo_url);
	}, []);

	return (
		<div className="w-full h-full flex flex-col items-center">
			<div className="relative w-40 aspect-square overflow-hidden rounded-[50%]">
				{picture && <Image src={picture} alt="" fill unoptimized />}
			</div>
		</div>
	);
};

export default page;
