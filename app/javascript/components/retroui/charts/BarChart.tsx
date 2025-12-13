import React from "react";
import {
	Bar,
	CartesianGrid,
	BarChart as RechartsBarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
	data: Record<string, any>[];
	index: string;
	categories: string[];
	strokeColors?: string[];
	fillColors?: string[];
	tooltipBgColor?: string;
	tooltipBorderColor?: string;
	gridColor?: string;
	valueFormatter?: (value: number) => string;
	showGrid?: boolean;
	showTooltip?: boolean;
	alignment?: "vertical" | "horizontal";
	className?: string;
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
	(
		{
			data = [],
			index,
			categories = [],
			strokeColors = ["var(--foreground)"],
			fillColors = ["var(--primary)"],
			tooltipBgColor = "var(--background)",
			tooltipBorderColor = "var(--border)",
			gridColor = "var(--muted)",
			valueFormatter = (value: number) => value.toString(),
			showGrid = true,
			showTooltip = true,
			alignment = "vertical",
			className,
			...props
		},
		ref,
	) => {
		return (
			<div className={cn("h-80 w-full", className)} ref={ref} {...props}>
				<ResponsiveContainer height="100%" width="100%">
					<RechartsBarChart
						data={data}
						layout={alignment === "horizontal" ? "vertical" : undefined}
						margin={{ bottom: 0, left: 0, right: 30, top: 10 }}
					>
						{showGrid && (
							<CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
						)}

						{alignment === "horizontal" ? (
							<>
								<XAxis
									axisLine={false}
									className="text-xs fill-muted-foreground"
									tickFormatter={valueFormatter}
									tickLine={false}
									type="number"
								/>

								<YAxis
									axisLine={false}
									className="text-xs fill-muted-foreground"
									dataKey={index}
									tickLine={false}
									type="category"
									width={80}
								/>
							</>
						) : (
							<>
								<XAxis
									axisLine={false}
									className="text-xs fill-muted-foreground"
									dataKey={index}
									tickLine={false}
								/>

								<YAxis
									axisLine={false}
									className="text-xs fill-muted-foreground"
									tickFormatter={valueFormatter}
									tickLine={false}
								/>
							</>
						)}

						{showTooltip && (
							<Tooltip
								content={({ active, payload, label }) => {
									if (!active || !payload?.length) return null;

									return (
										<div
											className="border p-2 shadow"
											style={{
												backgroundColor: tooltipBgColor,
												borderColor: tooltipBorderColor,
											}}
										>
											<div className="grid grid-cols-2 gap-2">
												<div className="flex flex-col">
													<span className="text-[0.70rem] uppercase text-muted-foreground">
														{index}
													</span>
													<span className="font-bold text-muted-foreground">
														{label}
													</span>
												</div>
												{payload.map((entry, index) => (
													<div className="flex flex-col" key={index}>
														<span className="text-[0.70rem] uppercase text-muted-foreground">
															{entry.dataKey}
														</span>
														<span
															className="font-bold"
															style={{ color: strokeColors[0] }}
														>
															{valueFormatter(entry.value as number)}
														</span>
													</div>
												))}
											</div>
										</div>
									);
								}}
							/>
						)}

						{categories.map((category, index) => {
							const fillColor = fillColors[index] || fillColors[0];
							const strokeColor = strokeColors[index] || strokeColors[0];

							return (
								<Bar
									dataKey={category}
									fill={fillColor}
									key={category}
									stroke={strokeColor}
									strokeWidth={1}
								/>
							);
						})}
					</RechartsBarChart>
				</ResponsiveContainer>
			</div>
		);
	},
);

BarChart.displayName = "BarChart";

export { BarChart, type BarChartProps };
