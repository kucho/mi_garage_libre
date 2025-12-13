import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const BreadcrumbRoot = React.forwardRef<
	HTMLElement,
	React.ComponentPropsWithoutRef<"nav">
>(({ className, ...props }, ref) => (
	<nav
		aria-label="breadcrumb"
		className={cn("w-full text-sm", className)}
		ref={ref}
		{...props}
	/>
));
BreadcrumbRoot.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<
	HTMLOListElement,
	React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
	<ol
		className={cn(
			"flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-muted-foreground",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
	<li
		className={cn("inline-flex items-center", className)}
		ref={ref}
		{...props}
	/>
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
	HTMLAnchorElement,
	React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }
>(({ asChild, className, ...props }, ref) => {
	const Comp = asChild ? Slot : "a";
	return (
		<Comp
			className={cn(
				"font-medium transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring rounded-sm",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
	HTMLSpanElement,
	React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
	<span
		aria-current="page"
		className={cn("text-foreground font-semibold", className)}
		ref={ref}
		{...props}
	/>
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
	children,
	className,
	...props
}: React.ComponentProps<"li">) => (
	<li
		aria-hidden="true"
		className={cn("text-muted-foreground [&>svg]:h-4 [&>svg]:w-4", className)}
		role="presentation"
		{...props}
	>
		{children ?? <ChevronRight />}
	</li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		className={cn("flex h-9 w-9 items-center justify-center", className)}
		role="presentation"
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">More</span>
	</span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

const Breadcrumb = Object.assign(BreadcrumbRoot, {
	Ellipsis: BreadcrumbEllipsis,
	Item: BreadcrumbItem,
	Link: BreadcrumbLink,
	List: BreadcrumbList,
	Page: BreadcrumbPage,
	Separator: BreadcrumbSeparator,
});

export { Breadcrumb };
