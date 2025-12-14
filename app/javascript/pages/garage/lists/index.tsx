import type { GarageList } from "@/types/serializers";
import { LayoutGrid, TableIcon } from "lucide-react";
import { useState } from "react";
import { ListCard } from "@/components/garage/list-card";
import { NewListDialog } from "@/components/garage/new-list-dialog";
import { Button } from "@/components/retroui/Button";
import { Table } from "@/components/retroui/Table";
import { Nav } from "@/components/ui/nav";

interface Props {
	lists: GarageList[];
	errors?: Record<string, string[]>;
}

type ViewMode = "cards" | "table";

export default function ListsIndex({ lists, errors }: Props) {
	const [viewMode, setViewMode] = useState<ViewMode>("cards");

	return (
		<>
			<Nav />
			<main className="container mx-auto px-4 py-6">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-head font-bold">My Lists</h1>
					<div className="flex items-center gap-2">
						<div className="flex border-2 rounded overflow-hidden">
							<Button
								onClick={() => setViewMode("cards")}
								size="icon"
								title="Card view"
								variant={viewMode === "cards" ? "default" : "ghost"}
							>
								<LayoutGrid className="w-4 h-4" />
							</Button>
							<Button
								onClick={() => setViewMode("table")}
								size="icon"
								title="Table view"
								variant={viewMode === "table" ? "default" : "ghost"}
							>
								<TableIcon className="w-4 h-4" />
							</Button>
						</div>
						<NewListDialog errors={errors} />
					</div>
				</div>

				{lists.length === 0 ? (
					<div className="text-center py-12 text-muted-foreground">
						<p>No lists yet. Create your first one!</p>
					</div>
				) : viewMode === "cards" ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{lists.map((list) => (
							<ListCard key={list.id} list={list} />
						))}
					</div>
				) : (
					<Table>
						<Table.Header>
							<Table.Row>
								<Table.Head>Name</Table.Head>
								<Table.Head className="hidden sm:table-cell">
									Description
								</Table.Head>
								<Table.Head>Members</Table.Head>
								<Table.Head>Owner</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{lists.map((list) => (
								<Table.Row key={list.id}>
									<Table.Cell className="font-medium">{list.name}</Table.Cell>
									<Table.Cell className="hidden sm:table-cell text-muted-foreground">
										{list.description || "—"}
									</Table.Cell>
									<Table.Cell>{list.members_count}</Table.Cell>
									<Table.Cell>
										{list.owner.handle || list.owner.account.email || "Unknown"}
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				)}
			</main>
		</>
	);
}
