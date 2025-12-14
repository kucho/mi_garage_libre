import type React from "react";
import type { Profile } from "@/types/serializers";
import { useForm } from "@inertiajs/react";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Tooltip } from "@/components/retroui/Tooltip";
import { Nav } from "@/components/ui/nav";

interface Props {
	profile: Profile;
	errors?: Record<string, string[]>;
}

export default function ProfileShow({ profile, errors: serverErrors }: Props) {
	const { data, setData, patch, processing, errors } = useForm({
		first_name: profile.first_name || "",
		handle: profile.handle || "",
		last_name: profile.last_name || "",
	});

	const allErrors = { ...serverErrors, ...errors };

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		patch("/profile");
	};

	return (
		<>
			<Nav />
			<main className="container mx-auto px-4 py-6 max-w-md">
				<h1 className="text-2xl font-head font-bold mb-6">Edit Profile</h1>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<Label htmlFor="first_name">First Name</Label>
						<Input
							aria-describedby={
								allErrors?.first_name ? "first_name-error" : undefined
							}
							aria-invalid={!!allErrors?.first_name}
							id="first_name"
							onChange={(e) => setData("first_name", e.target.value)}
							placeholder="John"
							value={data.first_name}
						/>
						{allErrors?.first_name && (
							<p className="text-sm text-destructive" id="first_name-error">
								{allErrors.first_name}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="last_name">Last Name</Label>
						<Input
							aria-describedby={
								allErrors?.last_name ? "last_name-error" : undefined
							}
							aria-invalid={!!allErrors?.last_name}
							id="last_name"
							onChange={(e) => setData("last_name", e.target.value)}
							placeholder="Doe"
							value={data.last_name}
						/>
						{allErrors?.last_name && (
							<p className="text-sm text-destructive" id="last_name-error">
								{allErrors.last_name}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-1">
							<Label htmlFor="handle">Handle</Label>
							<Tooltip.Provider>
								<Tooltip>
									<Tooltip.Trigger asChild>
										<button className="text-muted-foreground" type="button">
											<HelpCircle className="w-4 h-4" />
										</button>
									</Tooltip.Trigger>
									<Tooltip.Content>
										<p>Minimum 3 characters.</p>
										<p>Must start with a letter.</p>
										<p>Only letters and numbers allowed.</p>
									</Tooltip.Content>
								</Tooltip>
							</Tooltip.Provider>
						</div>
						<Input
							aria-describedby={allErrors?.handle ? "handle-error" : undefined}
							aria-invalid={!!allErrors?.handle}
							id="handle"
							onChange={(e) => setData("handle", e.target.value)}
							placeholder="johndoe123"
							value={data.handle}
						/>
						{allErrors?.handle && (
							<p className="text-sm text-destructive" id="handle-error">
								{allErrors.handle}
							</p>
						)}
					</div>

					<div className="flex gap-2 pt-4">
						<Button disabled={processing} type="submit">
							{processing ? "Saving..." : "Save Changes"}
						</Button>
						<Button
							onClick={() => window.history.back()}
							type="button"
							variant="ghost"
						>
							Cancel
						</Button>
					</div>
				</form>
			</main>
		</>
	);
}
