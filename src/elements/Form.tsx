import React from "react";

type FormProps = React.HTMLAttributes<HTMLFormElement> & {
	children: React.ReactNode;
	className?: string;
};
const Form = ({ className, children, ...props }: FormProps) => {
	return (
		<form
			className={
				"w-full h-[45px] flex gap-[10px] rounded-[10px] px-[10px] bg-[var(--tg-theme-secondary-bg-color)] " +
				(className ? className : "")
			}
			{...props}
		>
			{children}
		</form>
	);
};

export default Form;
