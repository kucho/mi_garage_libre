import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
	<div className="relative h-full w-full overflow-auto">
		<table
			className={cn(
				"w-full caption-bottom text-sm border-2 shadow-lg",
				className,
			)}
			ref={ref}
			{...props}
		/>
	</div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead
		className={cn(
			"[&_tr]:border-b bg-primary text-primary-foreground font-head",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tbody
		className={cn("[&_tr:last-child]:border-0", className)}
		ref={ref}
		{...props}
	/>
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tfoot
		className={cn(
			"border-t bg-accent font-medium [&>tr]:last:border-b-0",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		className={cn(
			"border-b transition-colors hover:bg-primary/50 hover:text-primary-foreground data-[state=selected]:bg-muted",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<th
		className={cn(
			"h-10 md:h-12 px-4 text-left align-middle font-medium text-primary-foreground [&:has([role=checkbox])]:pr-0",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		className={cn(
			"p-2 md:p-3 align-middle [&:has([role=checkbox])]:pr-0",
			className,
		)}
		ref={ref}
		{...props}
	/>
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption
		className={cn("my-2 text-sm text-muted-foreground", className)}
		ref={ref}
		{...props}
	/>
));
TableCaption.displayName = "TableCaption";

const TableObj = Object.assign(Table, {
	Body: TableBody,
	Caption: TableCaption,
	Cell: TableCell,
	Footer: TableFooter,
	Head: TableHead,
	Header: TableHeader,
	Row: TableRow,
});

export { TableObj as Table };
