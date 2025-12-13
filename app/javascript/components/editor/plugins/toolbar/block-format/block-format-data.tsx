import {
	CodeIcon,
	Heading1Icon,
	Heading2Icon,
	Heading3Icon,
	ListIcon,
	ListOrderedIcon,
	ListTodoIcon,
	QuoteIcon,
	TextIcon,
} from "lucide-react";

export const blockTypeToBlockName: Record<
	string,
	{ label: string; icon: React.ReactNode }
> = {
	bullet: {
		icon: <ListIcon className="size-4" />,
		label: "Bulleted List",
	},
	check: {
		icon: <ListTodoIcon className="size-4" />,
		label: "Check List",
	},
	code: {
		icon: <CodeIcon className="size-4" />,
		label: "Code Block",
	},
	h1: {
		icon: <Heading1Icon className="size-4" />,
		label: "Heading 1",
	},
	h2: {
		icon: <Heading2Icon className="size-4" />,
		label: "Heading 2",
	},
	h3: {
		icon: <Heading3Icon className="size-4" />,
		label: "Heading 3",
	},
	number: {
		icon: <ListOrderedIcon className="size-4" />,
		label: "Numbered List",
	},
	paragraph: {
		icon: <TextIcon className="size-4" />,
		label: "Paragraph",
	},
	quote: {
		icon: <QuoteIcon className="size-4" />,
		label: "Quote",
	},
};
