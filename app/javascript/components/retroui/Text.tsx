import type { ElementType, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("font-head", {
	defaultVariants: {
		as: "p",
	},
	variants: {
		as: {
			a: "font-sans text-base hover:underline underline-offset-2 decoration-primary",
			h1: "text-4xl lg:text-5xl font-bold",
			h2: "text-3xl lg:text-4xl font-semibold",
			h3: "text-2xl font-medium",
			h4: "text-xl font-normal",
			h5: "text-lg font-normal",
			h6: "text-base font-normal",
			li: "font-sans text-base",
			p: "font-sans text-base",
		},
	},
});

interface TextProps
	extends Omit<HTMLAttributes<HTMLElement>, "className">,
		VariantProps<typeof textVariants> {
	className?: string;
}

export const Text = (props: TextProps) => {
	const { className, as, ...otherProps } = props;
	const Tag: ElementType = as || "p";

	return (
		<Tag className={cn(textVariants({ as }), className)} {...otherProps} />
	);
};
