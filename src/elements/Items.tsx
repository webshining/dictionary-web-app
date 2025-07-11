import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	className?: string;
};

const Items = ({ children, className, ...props }: DivProps) => {
	return (
		<div
			className={"w-full overflow-y-auto gap-[15px] text-[18px] grid grid-rows-[repeat(auto-fill,65px)] " + (className ? className : "")}
			{...props}
		>
			{children}
		</div>
	);
};

export default Items;
