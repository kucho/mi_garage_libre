import { router, usePage } from "@inertiajs/react";
import { LogOut, Menu as MenuIcon, User, X } from "lucide-react";
import { useState } from "react";
import { Menu } from "@/components/retroui/Menu";

export function Nav() {
	const { auth } = usePage().props;
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleLogout = () => {
		router.post("/logout");
	};

	const displayName =
		auth.profile?.first_name ||
		auth.profile?.handle ||
		auth.profile?.account?.email?.split("@")[0] ||
		"User";

	return (
		<nav className="border-black bg-white sticky top-0 border-b-2 z-10">
			<div className="container max-w-6xl mx-auto max-lg:px-4 py-4 flex justify-between items-center">
				<a className="flex items-center space-x-2" href="/">
					<img src="/icon.svg" alt="MiGarage Logo" className="h-8 w-8" />
					<p className="font-sans text-xl font-bold">MiGarage</p>
					<span className="font-semibold rounded bg-black text-white px-2 py-1 text-xs">
						Libre
					</span>
				</a>

				{/* Mobile menu button */}
				<button
					className="lg:hidden flex items-center justify-center h-8 w-8 border-2 border-black rounded-md"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					type="button"
				>
					{mobileMenuOpen ? (
						<X className="h-4 w-4" />
					) : (
						<MenuIcon className="h-4 w-4" />
					)}
				</button>

				{/* Desktop menu */}
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
							<Menu>
								<Menu.Trigger asChild>
									<button
										className="flex items-center gap-2 font-head outline-hidden rounded-md cursor-pointer shadow-md hover:shadow-xs bg-background text-black border-2 border-black transition-all hover:translate-y-1 px-3 py-1 text-sm"
										type="button"
									>
										<div className="h-6 w-6 rounded-full bg-primary border-2 border-black flex items-center justify-center text-xs font-bold">
											{displayName[0].toUpperCase()}
										</div>
										<span>{displayName}</span>
									</button>
								</Menu.Trigger>
								<Menu.Content align="end" className="min-w-[180px]">
									<Menu.Item
										className="cursor-pointer"
										onSelect={() => router.visit("/profile/edit")}
									>
										<User className="w-4 h-4 mr-2" />
										Edit Profile
									</Menu.Item>
									<Menu.Item
										className="cursor-pointer text-destructive"
										onSelect={handleLogout}
									>
										<LogOut className="w-4 h-4 mr-2" />
										Logout
									</Menu.Item>
								</Menu.Content>
							</Menu>
						</>
					)}
				</div>
			</div>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className="lg:hidden border-t-2 border-black bg-white">
					<div className="container max-w-6xl mx-auto px-4 py-4 flex flex-col space-y-4">
						{!auth.profile && (
							<>
								<a
									className="block py-2 hover:underline"
									href="/login"
									onClick={() => setMobileMenuOpen(false)}
								>
									Sign in
								</a>
								<a
									className="block py-2 hover:underline"
									href="/create-account"
									onClick={() => setMobileMenuOpen(false)}
								>
									Create Account
								</a>
							</>
						)}
						{auth.profile && (
							<>
								<div className="flex items-center gap-2 py-2 border-b border-gray-200">
									<div className="h-8 w-8 rounded-full bg-primary border-2 border-black flex items-center justify-center text-sm font-bold">
										{displayName[0].toUpperCase()}
									</div>
									<span className="font-medium">{displayName}</span>
								</div>
								<a
									className="block py-2 hover:underline"
									href="/garage/lists"
									onClick={() => setMobileMenuOpen(false)}
								>
									My Lists
								</a>
								<a
									className="flex items-center gap-2 py-2 hover:underline"
									href="/profile/edit"
									onClick={() => setMobileMenuOpen(false)}
								>
									<User className="w-4 h-4" />
									Edit Profile
								</a>
								<button
									className="flex items-center gap-2 py-2 text-destructive hover:underline text-left"
									onClick={() => {
										setMobileMenuOpen(false);
										handleLogout();
									}}
									type="button"
								>
									<LogOut className="w-4 h-4" />
									Logout
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}
