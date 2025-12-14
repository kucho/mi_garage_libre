import { usePage } from "@inertiajs/react";
import { Text } from "@/components/retroui/Text";

export function Nav() {
	const { auth } = usePage().props;

	return (
		<nav className="border-black bg-white sticky top-0 border-b-2 z-10">
			<div className="container max-w-6xl mx-auto max-lg:px-4 py-4 flex justify-between items-center">
				<a className="flex items-center space-x-2" href="/">
					<div className="h-6 w-6 rounded-full border-2 border-black flex items-center justify-center">
						<div className="h-2 w-1 bg-black transform rotate-45"></div>
					</div>
					<p className="font-sans text-xl font-bold">MiGarage</p>
					<span className="font-semibold rounded bg-black text-white px-2 py-1 text-xs">
						Libre
					</span>
				</a>
				<button
					className="lg:hidden flex items-center justify-center h-8 w-8 border-2 border-black rounded-md"
					type="button"
				>
					<svg
						aria-hidden="true"
						className="lucide lucide-menu h-4 w-4"
						fill="none"
						height="24"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						width="24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M4 5h16"></path>
						<path d="M4 12h16"></path>
						<path d="M4 19h16"></path>
					</svg>
				</button>
				<div className="lg:flex lg:items-center lg:space-x-4 hidden absolute lg:static top-full left-0 w-full lg:w-auto bg-white border-t-2 border-black lg:border-none">
					<div className="flex text-sm flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 px-6 py-4 lg:p-0">
						<a
							// aria-current="page"
							className="hover:underline decoration-primary-500 active"
							data-status="active"
							href="/blocks"
						>
							Highlights
						</a>
						<a className="hover:underline decoration-primary-500" href="/about">
							About
						</a>
					</div>
				</div>
				<div className="hidden lg:flex items-center space-x-4">
					{!auth.profile && (
						<>
							<a href="/login">
								<button
									className="font-head outline-hidden rounded-md cursor-pointer flex justify-center items-center shadow-md hover:shadow-xs bg-background text-black border-2 border-black transition-all hover:translate-y-1 px-4 py-1 text-sm"
									type="button"
								>
									Sign in
								</button>
							</a>
							<a href="/create-account">
								<button
									className="font-head outline-hidden rounded-md cursor-pointer flex justify-center items-center shadow-md hover:shadow-xs bg-primary text-black border-2 border-black hover:bg-primary-hover transition-all hover:translate-y-1 px-4 py-1 text-sm"
									type="button"
								>
									Access Now
								</button>
							</a>
						</>
					)}
					{auth.profile && (
						<>
							<a
								className="hover:underline decoration-primary-500"
								href="/garage/lists"
							>
								My Lists
							</a>
							<Text>Welcome {auth.profile.account.email}</Text>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
