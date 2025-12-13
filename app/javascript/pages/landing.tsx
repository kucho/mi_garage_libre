import type { SerializedEditorState } from "lexical";
import { useState } from "react";
import { Editor } from "@/components/blocks/editor-x/editor";
import { Nav } from "@/components/ui/nav";

export const initialValue = {
	root: {
		children: [
			{
				children: [
					{
						detail: 0,
						format: 0,
						mode: "normal",
						style: "",
						text: "Hello World 🚀",
						type: "text",
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				type: "paragraph",
				version: 1,
			},
		],
		direction: "ltr",
		format: "",
		indent: 0,
		type: "root",
		version: 1,
	},
} as unknown as SerializedEditorState;

export default function Landing() {
	const [editorState, setEditorState] =
		useState<SerializedEditorState>(initialValue);

	return (
		<>
			<Nav />
			<Editor
				editorSerializedState={editorState}
				onSerializedChange={(value) => setEditorState(value)}
			/>
		</>
	);
}
