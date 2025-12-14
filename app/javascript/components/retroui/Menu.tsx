"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const Menu = DropdownMenu.Root;
const Trigger = DropdownMenu.Trigger;

interface IMenuContent
	extends ComponentPropsWithoutRef<typeof DropdownMenu.Content> {}

const Content = ({ className, ...props }: IMenuContent) => (
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			align="start"
			className={cn("bg-white border-2 shadow-md min-w-20 z-50", className)}
			side="bottom"
			sideOffset={4}
			{...props}
		/>
	</DropdownMenu.Portal>
);

const MenuItem = React.forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof DropdownMenu.Item>
>(({ className, ...props }, ref) => (
	<DropdownMenu.Item
		className={cn(
			"relative text-black flex cursor-default select-none items-center rounded-xs px-2 py-1.5 text-sm outline-hidden transition-colors hover:bg-primary focus:bg-primary data-disabled:pointer-events-none data-disabled:opacity-50",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
MenuItem.displayName = "MenuItem";

const MenuComponent = Object.assign(Menu, {
	Content,
	Item: MenuItem,
	Trigger,
});

export { MenuComponent as Menu };
