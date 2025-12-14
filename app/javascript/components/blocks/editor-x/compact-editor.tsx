import {
	type InitialConfigType,
	LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
	$getRoot,
	type EditorState,
	type SerializedEditorState,
} from "lexical";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CompactPlugins } from "./compact-plugins";
import { nodes } from "./nodes";

const editorConfig: InitialConfigType = {
	namespace: "CompactEditor",
	nodes,
	onError: (error: Error) => {
		console.error(error);
	},
	theme: editorTheme,
};

export function CompactEditor({
	editorState,
	editorSerializedState,
	onChange,
	onSerializedChange,
	onPlainTextChange,
}: {
	editorState?: EditorState;
	editorSerializedState?: SerializedEditorState;
	onChange?: (editorState: EditorState) => void;
	onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
	onPlainTextChange?: (plainText: string) => void;
}) {
	return (
		<div className="bg-background overflow-hidden rounded-lg border-2 shadow-md">
			<LexicalComposer
				initialConfig={{
					...editorConfig,
					...(editorState ? { editorState } : {}),
					...(editorSerializedState
						? { editorState: JSON.stringify(editorSerializedState) }
						: {}),
				}}
			>
				<TooltipProvider>
					<CompactPlugins />

					<OnChangePlugin
						ignoreSelectionChange={true}
						onChange={(editorState) => {
							onChange?.(editorState);
							onSerializedChange?.(editorState.toJSON());
							if (onPlainTextChange) {
								editorState.read(() => {
									const plainText = $getRoot().getTextContent();
									onPlainTextChange(plainText);
								});
							}
						}}
					/>
				</TooltipProvider>
			</LexicalComposer>
		</div>
	);
}
