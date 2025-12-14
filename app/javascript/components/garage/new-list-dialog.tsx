import { Form } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Textarea } from "@/components/retroui/Textarea";

interface NewListDialogProps {
	errors?: Record<string, string[]>;
}

export function NewListDialog({ errors }: NewListDialogProps) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<Dialog.Trigger asChild>
				<Button>
					<Plus className="w-4 h-4 mr-2" />
					New List
				</Button>
			</Dialog.Trigger>
			<Dialog.Content size="md">
				<Dialog.Header>Create New List</Dialog.Header>
				<Form
					action="/garage/lists"
					className="p-4 space-y-4"
					method="post"
					onSuccess={() => setOpen(false)}
				>
					<div className="space-y-2">
						<Label htmlFor="name">Name *</Label>
						<Input
							aria-invalid={!!errors?.name}
							id="name"
							name="list[name]"
							placeholder="My garage sale list"
							required
						/>
						{errors?.name && (
							<p className="text-sm text-destructive">{errors.name[0]}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							name="list[description]"
							placeholder="What's this list about?"
						/>
						{errors?.description && (
							<p className="text-sm text-destructive">
								{errors.description[0]}
							</p>
						)}
					</div>
					<Dialog.Footer>
						<Button type="submit">Create List</Button>
					</Dialog.Footer>
				</Form>
			</Dialog.Content>
		</Dialog>
	);
}
