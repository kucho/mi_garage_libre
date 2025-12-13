import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("font-semibold rounded", {
	defaultVariants: {
		size: "md",
		variant: "default",
	},
	variants: {
		size: {
			lg: "px-3 py-2 text-base",
			md: "px-2.5 py-1.5 text-sm",
			sm: "px-2 py-1 text-xs",
		},
		variant: {
			default: "bg-muted text-muted-foreground",
			outline: "outline-2 outline-foreground text-foreground",
			solid: "bg-foreground text-background",
			surface: "outline-2 bg-primary text-primary-foreground",
		},
	},
});

interface ButtonProps
	extends HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof badgeVariants> {}

export function Badge({
	children,
	size = "md",
	variant = "default",
	className = "",
	...props
}: ButtonProps) {
	return (
		<span
			className={cn(badgeVariants({ size, variant }), className)}
			{...props}
		>
			{children}
		</span>
	);
}
