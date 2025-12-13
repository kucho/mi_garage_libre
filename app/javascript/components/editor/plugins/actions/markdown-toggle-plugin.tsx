"use client";

import { $createCodeNode, $isCodeNode } from "@lexical/code";
import {
	$convertFromMarkdownString,
	$convertToMarkdownString,
	type Transformer,
} from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getRoot } from "lexical";
import { FileTextIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

export function MarkdownTogglePlugin({
	shouldPreserveNewLinesInMarkdown,
	transformers,
}: {
	shouldPreserveNewLinesInMarkdown: boolean;
	transformers: Array<Transformer>;
}) {
	const [editor] = useLexicalComposerContext();

	// biome-ignore lint/correctness/useExhaustiveDependencies: handled
	const handleMarkdownToggle = useCallback(() => {
		editor.update(() => {
			const root = $getRoot();
			const firstChild = root.getFirstChild();
			if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown") {
				$convertFromMarkdownString(
					firstChild.getTextContent(),
					transformers,
					undefined, // node
					shouldPreserveNewLinesInMarkdown,
				);
			} else {
				const markdown = $convertToMarkdownString(
					transformers,
					undefined, //node
					shouldPreserveNewLinesInMarkdown,
				);
				const codeNode = $createCodeNode("markdown");
				codeNode.append($createTextNode(markdown));
				root.clear().append(codeNode);
				if (markdown.length === 0) {
					codeNode.select();
				}
			}
		});
	}, [editor, shouldPreserveNewLinesInMarkdown]);

	return (
		<Button
			aria-label="Convert from markdown"
			className="p-2"
			onClick={handleMarkdownToggle}
			size={"sm"}
			title="Convert From Markdown"
			variant={"ghost"}
		>
			<FileTextIcon className="size-4" />
		</Button>
	);
}
