import { Head } from "@inertiajs/react";
import { version as react_version } from "react";
import inertiaSvg from "/assets/inertia.svg";
import railsSvg from "/assets/rails.svg";
import reactSvg from "/assets/react.svg";
import cs from "./index.module.css";

export default function InertiaExample({
	rails_version,
	ruby_version,
	rack_version,
	inertia_rails_version,
}: {
	rails_version: string;
	ruby_version: string;
	rack_version: string;
	inertia_rails_version: string;
}) {
	return (
		<div className={cs.root}>
			<Head title="Ruby on Rails + Inertia + React" />

			<nav className={cs.subNav}>
				<a href="https://rubyonrails.org" rel="noopener" target="_blank">
					<img
						alt="Ruby on Rails Logo"
						className={`${cs.logo} ${cs.rails}`}
						src={railsSvg}
					/>
				</a>
				<a href="https://inertia-rails.dev" rel="noopener" target="_blank">
					<img
						alt="Inertia logo"
						className={`${cs.logo} ${cs.inertia}`}
						src={inertiaSvg}
					/>
				</a>
				<a href="https://react.dev" rel="noopener" target="_blank">
					<img
						alt="React logo"
						className={`${cs.logo} ${cs.react}`}
						src={reactSvg}
					/>
				</a>
			</nav>

			<div className={cs.footer}>
				<div className={cs.card}>
					<p>
						Edit <code>app/javascript/pages/inertia_example/index.tsx</code> and
						save to test <abbr title="Hot Module Replacement">HMR</abbr>.
					</p>
				</div>

				<ul>
					<li>
						<ul>
							<li>
								<strong>Rails version:</strong> {rails_version}
							</li>
							<li>
								<strong>Rack version:</strong> {rack_version}
							</li>
						</ul>
					</li>
					<li>
						<strong>Ruby version:</strong> {ruby_version}
					</li>
					<li>
						<ul>
							<li>
								<strong>Inertia Rails version:</strong> {inertia_rails_version}
							</li>
							<li>
								<strong>React version:</strong> {react_version}
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	);
}
