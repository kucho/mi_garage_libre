import { Nav } from "@/components/ui/nav";

export default function Landing() {
	return (
		<>
			<Nav />
			<main className="container mx-auto px-4 py-12">
				<div className="text-center">
					<h1 className="text-4xl font-head font-bold mb-4">
						Welcome to MiGarage Libre
					</h1>
					<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
						A collaborative family-oriented garage sale platform where you can
						sell, give away, and find suitable new owners for meaningful items.
					</p>
				</div>
			</main>
		</>
	);
}
