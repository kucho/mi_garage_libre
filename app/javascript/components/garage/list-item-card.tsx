import type { GarageListItem } from "@/types/serializers";
import { ImageIcon } from "lucide-react";
import { DeleteItemDialog } from "@/components/garage/delete-item-dialog";
import { EditItemDialog } from "@/components/garage/edit-item-dialog";

interface ListItemCardProps {
	item: GarageListItem;
	listId: number;
	errors?: Record<string, string[]>;
}

export function ListItemCard({ item, listId, errors }: ListItemCardProps) {
	return (
		<div className="border-2 rounded-lg shadow-md bg-background hover:shadow-lg transition-shadow flex flex-col sm:flex-row overflow-hidden">
			<div className="w-full sm:w-48 h-40 sm:h-auto bg-muted flex items-center justify-center flex-shrink-0">
				<ImageIcon className="w-12 h-12 text-muted-foreground" />
			</div>
			<div className="p-4 flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<h3 className="font-head text-lg font-semibold truncate">
						{item.title || "Untitled"}
					</h3>
					<div className="flex gap-1">
						<EditItemDialog errors={errors} item={item} listId={listId} />
						<DeleteItemDialog item={item} listId={listId} />
					</div>
				</div>
				{item.description_plain && (
					<p className="text-muted-foreground text-sm mt-2 line-clamp-3">
						{item.description_plain}
					</p>
				)}
				<div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
					{item.state && (
						<span className="px-2 py-1 bg-muted rounded">{item.state}</span>
					)}
					<span>
						by {item.creator.handle || item.creator.account.email || "Unknown"}
					</span>
				</div>
			</div>
		</div>
	);
}
