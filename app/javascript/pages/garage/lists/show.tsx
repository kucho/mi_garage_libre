import type { GarageList, GarageListItem } from "@/types/serializers";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { ListItemCard } from "@/components/garage/list-item-card";
import { NewItemDialog } from "@/components/garage/new-item-dialog";
import { Nav } from "@/components/ui/nav";

interface Props {
	list: GarageList;
	items: GarageListItem[];
	errors?: Record<string, string[]>;
}

export default function ListShow({ list, items, errors }: Props) {
	return (
		<>
			<Nav />
			<main className="container mx-auto px-4 py-6">
				<div className="mb-6">
					<Link
						className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
						href="/garage/lists"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to lists
					</Link>
					<div className="flex items-start justify-between gap-4">
						<div>
							<h1 className="text-2xl font-head font-bold">{list.name}</h1>
							{list.description && (
								<p className="text-muted-foreground mt-1">{list.description}</p>
							)}
						</div>
						<NewItemDialog errors={errors} listId={list.id} />
					</div>
				</div>

				{items.length === 0 ? (
					<div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
						<p>No items yet. Add your first item to this list!</p>
					</div>
				) : (
					<div className="space-y-4">
						{items.map((item) => (
							<ListItemCard item={item} key={item.id} />
						))}
					</div>
				)}
			</main>
		</>
	);
}
