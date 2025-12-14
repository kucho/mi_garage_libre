import {
	CHECK_LIST,
	ELEMENT_TRANSFORMERS,
	TEXT_FORMAT_TRANSFORMERS,
	TEXT_MATCH_TRANSFORMERS,
} from "@lexical/markdown";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { useState } from "react";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { AutoLinkPlugin } from "@/components/editor/plugins/auto-link-plugin";
import { FloatingLinkEditorPlugin } from "@/components/editor/plugins/floating-link-editor-plugin";
import { LinkPlugin } from "@/components/editor/plugins/link-plugin";
import { ListMaxIndentLevelPlugin } from "@/components/editor/plugins/list-max-indent-level-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { LinkToolbarPlugin } from "@/components/editor/plugins/toolbar/link-toolbar-plugin";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { HR } from "@/components/editor/transformers/markdown-hr-transformer";
import { Separator } from "@/components/ui/separator";

const placeholder = "Describe your item...";

export function CompactPlugins() {
	const [floatingAnchorElem, setFloatingAnchorElem] =
		useState<HTMLDivElement | null>(null);
	const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

	const onRef = (_floatingAnchorElem: HTMLDivElement) => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem);
		}
	};

	return (
		<div className="relative">
			<ToolbarPlugin>
				{() => (
					<div className="sticky top-0 z-10 flex items-center gap-1 overflow-auto border-b p-1">
						<HistoryToolbarPlugin />
						<Separator className="!h-6" orientation="vertical" />
						<FontFormatToolbarPlugin />
						<Separator className="!h-6" orientation="vertical" />
						<LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
					</div>
				)}
			</ToolbarPlugin>
			<div className="relative">
				<RichTextPlugin
					contentEditable={
						<div ref={onRef}>
							<ContentEditable
								className="relative block min-h-32 max-h-48 overflow-auto px-4 py-3 focus:outline-none"
								placeholder={placeholder}
							/>
						</div>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>

				<CheckListPlugin />
				<HorizontalRulePlugin />
				<ListPlugin />
				<TabIndentationPlugin />
				<HistoryPlugin />

				<MarkdownShortcutPlugin
					transformers={[
						HR,
						CHECK_LIST,
						...ELEMENT_TRANSFORMERS,
						...TEXT_FORMAT_TRANSFORMERS,
						...TEXT_MATCH_TRANSFORMERS,
					]}
				/>

				<AutoLinkPlugin />
				<LinkPlugin />
				<ListMaxIndentLevelPlugin />

				<FloatingLinkEditorPlugin
					anchorElem={floatingAnchorElem}
					isLinkEditMode={isLinkEditMode}
					setIsLinkEditMode={setIsLinkEditMode}
				/>
			</div>
		</div>
	);
}
