import type { SerializedEditorState } from "lexical";
import { useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CompactEditor } from "@/components/blocks/editor-x/compact-editor";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";

interface NewItemDialogProps {
	listId: number;
	errors?: Record<string, string[]>;
}

const emptyEditorState = {
	root: {
		children: [
			{
				children: [],
				direction: null,
				format: "",
				indent: 0,
				type: "paragraph",
				version: 1,
			},
		],
		direction: null,
		format: "",
		indent: 0,
		type: "root",
		version: 1,
	},
} as unknown as SerializedEditorState;

export function NewItemDialog({ listId, errors }: NewItemDialogProps) {
	const [open, setOpen] = useState(false);
	const { data, setData, post, processing, reset } = useForm({
		item: {
			description: "",
			description_plain: "",
			title: "",
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		post(`/garage/lists/${listId}/items`, {
			onSuccess: () => {
				setOpen(false);
				reset();
			},
		});
	};

	const handleEditorChange = (editorState: SerializedEditorState) => {
		setData("item", { ...data.item, description: JSON.stringify(editorState) });
	};

	const handlePlainTextChange = (plainText: string) => {
		setData("item", { ...data.item, description_plain: plainText });
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>
				<Button>
					<Plus className="w-4 h-4 mr-2" />
					Add Item
				</Button>
			</Dialog.Trigger>
			<Dialog.Content size="2xl">
				<Dialog.Header>Add New Item</Dialog.Header>
				<form className="p-4 space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<Label htmlFor="title">Title *</Label>
						<Input
							aria-invalid={!!errors?.title}
							autoFocus
							id="title"
							name="item[title]"
							onChange={(e) =>
								setData("item", { ...data.item, title: e.target.value })
							}
							placeholder="What are you selling or giving away?"
							required
							value={data.item.title}
						/>
						{errors?.title && (
							<p className="text-sm text-destructive">{errors.title[0]}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<CompactEditor
							editorSerializedState={emptyEditorState}
							onPlainTextChange={handlePlainTextChange}
							onSerializedChange={handleEditorChange}
						/>
						{errors?.description && (
							<p className="text-sm text-destructive">
								{errors.description[0]}
							</p>
						)}
					</div>
					<Dialog.Footer>
						<Button disabled={processing} type="submit">
							{processing ? "Adding..." : "Add Item"}
						</Button>
					</Dialog.Footer>
				</form>
			</Dialog.Content>
		</Dialog>
	);
}
