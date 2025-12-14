import type { SerializedEditorState } from "lexical";
import type { GarageListItem } from "@/types/serializers";
import { useForm } from "@inertiajs/react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { CompactEditor } from "@/components/blocks/editor-x/compact-editor";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";

interface EditItemDialogProps {
	listId: number;
	item: GarageListItem;
	errors?: Record<string, string[]>;
}

function parseEditorState(
	description: string | null,
): SerializedEditorState | undefined {
	if (!description) return undefined;
	try {
		return JSON.parse(description) as SerializedEditorState;
	} catch {
		return undefined;
	}
}

export function EditItemDialog({ listId, item, errors }: EditItemDialogProps) {
	const [open, setOpen] = useState(false);
	const { data, setData, patch, processing, reset } = useForm({
		item: {
			description: item.description || "",
			description_plain: item.description_plain || "",
			title: item.title || "",
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		patch(`/garage/lists/${listId}/items/${item.id}`, {
			onSuccess: () => {
				setOpen(false);
			},
		});
	};

	const handleEditorChange = (editorState: SerializedEditorState) => {
		setData("item", { ...data.item, description: JSON.stringify(editorState) });
	};

	const handlePlainTextChange = (plainText: string) => {
		setData("item", { ...data.item, description_plain: plainText });
	};

	const handleOpenChange = (isOpen: boolean) => {
		setOpen(isOpen);
		if (isOpen) {
			reset();
		}
	};

	return (
		<Dialog onOpenChange={handleOpenChange} open={open}>
			<Dialog.Trigger asChild>
				<Button size="sm" variant="outline">
					<Pencil className="w-4 h-4" />
				</Button>
			</Dialog.Trigger>
			<Dialog.Content size="2xl">
				<Dialog.Header>Edit Item</Dialog.Header>
				<form className="p-4 space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<Label htmlFor={`title-${item.id}`}>Title *</Label>
						<Input
							aria-invalid={!!errors?.title}
							autoFocus
							id={`title-${item.id}`}
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
						<Label htmlFor={`description-${item.id}`}>Description</Label>
						<CompactEditor
							editorSerializedState={parseEditorState(item.description)}
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
							{processing ? "Saving..." : "Save Changes"}
						</Button>
					</Dialog.Footer>
				</form>
			</Dialog.Content>
		</Dialog>
	);
}
