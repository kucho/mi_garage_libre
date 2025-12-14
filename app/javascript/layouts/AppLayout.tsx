import type { ReactNode } from "react";
import { Toaster } from "@/components/retroui/Sonner";

interface Props {
	children: ReactNode;
}

export default function AppLayout({ children }: Props) {
	return (
		<>
			{children}
			<Toaster closeButton duration={4000} position="bottom-right" richColors />
		</>
	);
}
