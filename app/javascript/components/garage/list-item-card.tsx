import type { GarageListItem } from "@/types/serializers";
import { ImageIcon } from "lucide-react";

interface ListItemCardProps {
	item: GarageListItem;
}

export function ListItemCard({ item }: ListItemCardProps) {
	return (
		<div className="border-2 rounded-lg shadow-md bg-background hover:shadow-lg transition-shadow flex flex-col sm:flex-row overflow-hidden">
			<div className="w-full sm:w-48 h-40 sm:h-auto bg-muted flex items-center justify-center flex-shrink-0">
				<ImageIcon className="w-12 h-12 text-muted-foreground" />
			</div>
			<div className="p-4 flex-1 min-w-0">
				<h3 className="font-head text-lg font-semibold truncate">
					{item.title || "Untitled"}
				</h3>
				{item.description && (
					<p className="text-muted-foreground text-sm mt-2 line-clamp-3">
						{item.description}
					</p>
				)}
				<div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
					{item.state && (
						<span className="px-2 py-1 bg-muted rounded">{item.state}</span>
					)}
					<span>
						by {item.creator.handle || item.creator.first_name || "Unknown"}
					</span>
				</div>
			</div>
		</div>
	);
}
