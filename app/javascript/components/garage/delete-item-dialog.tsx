import type { GarageListItem } from "@/types/serializers";
import { useForm } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";

interface DeleteItemDialogProps {
	listId: number;
	item: GarageListItem;
}

export function DeleteItemDialog({ listId, item }: DeleteItemDialogProps) {
	const [open, setOpen] = useState(false);
	const { delete: destroy, processing } = useForm({});

	const handleDelete = () => {
		destroy(`/garage/lists/${listId}/items/${item.id}`, {
			onSuccess: () => {
				setOpen(false);
			},
		});
	};

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>
				<Button size="sm" variant="outline">
					<Trash2 className="w-4 h-4" />
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>Delete Item</Dialog.Header>
				<div className="p-4 space-y-4">
					<p>
						Are you sure you want to delete{" "}
						<strong>{item.title || "this item"}</strong>? This action cannot be
						undone.
					</p>
					<Dialog.Footer>
						<Button
							disabled={processing}
							onClick={() => setOpen(false)}
							type="button"
							variant="outline"
						>
							Cancel
						</Button>
						<Button
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
							disabled={processing}
							onClick={handleDelete}
							type="button"
						>
							{processing ? "Deleting..." : "Delete"}
						</Button>
					</Dialog.Footer>
				</div>
			</Dialog.Content>
		</Dialog>
	);
}
