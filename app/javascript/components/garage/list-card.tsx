import type { GarageList } from "@/types/serializers";
import { Users } from "lucide-react";

interface ListCardProps {
	list: GarageList;
}

export function ListCard({ list }: ListCardProps) {
	return (
		<div className="border-2 rounded-lg p-4 shadow-md bg-background hover:shadow-lg transition-shadow">
			<h3 className="font-head text-lg font-semibold truncate">{list.name}</h3>
			{list.description && (
				<p className="text-muted-foreground text-sm mt-1 line-clamp-2">
					{list.description}
				</p>
			)}
			<div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<Users className="w-4 h-4" />
					<span>{list.members_count}</span>
				</div>
				<span>
					by {list.owner.handle || list.owner.account.email || "Unknown"}
				</span>
			</div>
		</div>
	);
}
