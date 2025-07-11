import React from "react";

type ButtonProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	className?: string;
};

const Button = ({ children, className, ...args }: ButtonProps) => {
	return (
		<div
			className={
				"transition-all duration-300 ease flex justify-center items-center text-[var(--tg-theme-subtitle-text-color)] rounded-[6px] hover:text-[var(--tg-theme-text-color)] cursor-pointer text-[24px] " +
				(className ? className : "")
			}
			{...args}
		>
			{children}
		</div>
	);
};

export default Button;
