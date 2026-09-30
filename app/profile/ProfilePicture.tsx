"use client";

import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfilePicture = () => {
	const [picture, setPicture] = useState<string | undefined>();

	useEffect(() => {
		setPicture(window.Telegram.WebApp.initDataUnsafe.user?.photo_url);
	}, []);

	return (
		<div className="relative w-10 aspect-square rounded-4xl overflow-hidden flex justify-center items-center">
			{picture ? <Image src={picture} alt="" fill unoptimized loading="eager" /> : <User size={30} />}
		</div>
	);
};

export default ProfilePicture;
