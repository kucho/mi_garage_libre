import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";

export default defineConfig({
	plugins: [react(), RubyPlugin(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./app/javascript"),
		},
	},
});
