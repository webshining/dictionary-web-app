"use client";

import clsx from "clsx";
import { BrainCircuit, User, WholeWord } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

const NavBar = () => {
	const pathname = usePathname();

	return (
		<div className="sticky w-full bottom-0 left-0 py-2 flex justify-center z-99900000">
			<div className="rounded-[50px] bg-background/50 p-1.5 flex justify-center z-999 glass">
				<ul className="flex gap-2">
					<li>
						<Link
							href="/"
							className={clsx(
								"flex flex-col items-center rounded-xl px-3 py-1 text-sm transition-all duration-300 ease-in-out",
								pathname === "/" && "text-accent",
							)}
							prefetch
						>
							<WholeWord
								className="transition-all duration-300 ease-in-out"
								size={22}
								strokeWidth={pathname === "/" ? 3 : 1}
							/>
						</Link>
					</li>
					<li>
						<Link
							href="/cards"
							className={clsx(
								"flex flex-col items-center rounded-xl px-3 py-1 text-sm transition-all duration-300 ease-in-out",
								pathname.startsWith("/cards") && "text-accent",
							)}
							prefetch
						>
							<BrainCircuit
								className="transition-all duration-300 ease-in-out"
								size={22}
								strokeWidth={pathname.startsWith("/cards") ? 3 : 1}
							/>
						</Link>
					</li>
					<li>
						<Link
							href="/profile"
							className={clsx(
								"flex flex-col items-center rounded-xl px-3 py-1 text-sm transition-all duration-300 ease-in-out",
								pathname.startsWith("/profile") && "text-accent",
							)}
							prefetch
						>
							<User
								className="transition-all duration-300 ease-in-out"
								size={22}
								strokeWidth={pathname.startsWith("/profile") ? 3 : 1}
							/>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default memo(NavBar);
