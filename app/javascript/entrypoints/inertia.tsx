import type { ReactNode } from "react";
import type { Flash } from "@/types";
import {
	createInertiaApp,
	type ResolvedComponent,
	router,
} from "@inertiajs/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { toast } from "sonner";
import AppLayout from "@/layouts/AppLayout";

void createInertiaApp({
	defaults: {
		form: {
			forceIndicesArrayFormatInFormData: false,
		},
		future: {
			preserveEqualProps: true,
			useDataInertiaHeadAttribute: true,
			useDialogForErrorModal: true,
			useScriptElementForInitialPage: true,
		},
	},
	// Set default page title
	// see https://inertia-rails.dev/guide/title-and-meta
	//
	// title: title => title ? `${title} - App` : 'App',

	// Disable progress bar
	//
	// see https://inertia-rails.dev/guide/progress-indicators
	// progress: false,

	resolve: (name) => {
		const pages = import.meta.glob<{ default: ResolvedComponent }>(
			"../pages/**/*.tsx",
			{
				eager: true,
			},
		);

		const normalizedName = name.replace(/^pages\//, "");
		const page = pages[`../pages/${normalizedName}.tsx`];

		if (!page) {
			console.error(`Missing Inertia page component: '${name}.tsx'`);
		}

		// Set default layout
		// see https://inertia-rails.dev/guide/pages#default-layouts
		page.default.layout ||= (page: ReactNode) => <AppLayout>{page}</AppLayout>;

		return page;
	},

	setup({ el, App, props }) {
		router.on("success", (event) => {
			const flash = event.detail.page.props.flash as Flash;

			if (flash?.notice) {
				toast.success(flash.notice);
			}

			if (flash?.alert) {
				toast.error(flash.alert);
			}
		});

		createRoot(el).render(
			<StrictMode>
				<App {...props} />
			</StrictMode>,
		);
	},
}).catch((error) => {
	// This ensures this entrypoint is only loaded on Inertia pages
	// by checking for the presence of the root element (#app by default).
	// Feel free to remove this `catch` if you don't need it.
	if (document.getElementById("app")) {
		throw error;
	} else {
		console.error(
			"Missing root element.\n\n" +
				"If you see this error, it probably means you loaded Inertia.js on non-Inertia pages.\n" +
				'Consider moving <%= vite_typescript_tag "inertia.tsx" %> to the Inertia-specific layout instead.',
		);
	}
});
