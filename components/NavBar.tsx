"use client";

import clsx from "clsx";
import { BrainCircuit, User, WholeWord } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const NavBar = () => {
	const pathname = usePathname();

	return (
		<div className="sticky bottom-0 left-0 p-1 px-1.5 flex justify-center rounded-2xl glass z-999">
			<ul className="flex gap-2">
				<li>
					<Link
						href="/"
						className={clsx(
							"flex flex-col items-center rounded-xl px-3 py-1 text-sm transition-all duration-300 ease-in-out",
							pathname === "/" && "bg-blue-100/50",
						)}
						prefetch
					>
						<WholeWord size={20} />
						<span>Words</span>
					</Link>
				</li>
				<li>
					<Link
						href="/cards"
						className={clsx(
							"flex flex-col items-center rounded-xl px-3 py-1 text-sm transition-all duration-300 ease-in-out",
							pathname.startsWith("/cards") && "bg-blue-100/50",
						)}
						prefetch
					>
						<BrainCircuit size={20} />
						<span>Cards</span>
					</Link>
				</li>
				<li>
					<Link
						href="/profile"
						className={clsx(
							"flex flex-col items-center rounded-xl px-3 py-1 text-sm transition-all duration-300 ease-in-out",
							pathname.startsWith("/profile") && "bg-blue-100/50",
						)}
						prefetch
					>
						<User size={20} />
						<span>Profile</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default memo(NavBar);
