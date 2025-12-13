import React from "react";
import {
	CartesianGrid,
	Line,
	LineChart as RechartsLineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
	data: Record<string, any>[];
	index: string;
	categories: string[];
	strokeColors?: string[];
	tooltipBgColor?: string;
	tooltipBorderColor?: string;
	gridColor?: string;
	valueFormatter?: (value: number) => string;
	showGrid?: boolean;
	showTooltip?: boolean;
	strokeWidth?: number;
	dotSize?: number;
	className?: string;
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
	(
		{
			data = [],
			index,
			categories = [],
			strokeColors = ["var(--foreground)"],
			tooltipBgColor = "var(--background)",
			tooltipBorderColor = "var(--border)",
			gridColor = "var(--muted)",
			valueFormatter = (value: number) => value.toString(),
			showGrid = true,
			showTooltip = true,
			strokeWidth = 2,
			dotSize = 4,
			className,
			...props
		},
		ref,
	) => {
		return (
			<div className={cn("h-80 w-full", className)} ref={ref} {...props}>
				<ResponsiveContainer height="100%" width="100%">
					<RechartsLineChart
						data={data}
						margin={{ bottom: 0, left: 0, right: 30, top: 0 }}
					>
						{showGrid && (
							<CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
						)}

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
															style={{ color: entry.color }}
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
							const strokeColor = strokeColors[index] || strokeColors[0];

							return (
								<Line
									activeDot={{ fill: strokeColor, r: dotSize + 2 }}
									dataKey={category}
									dot={{ fill: strokeColor, r: dotSize }}
									key={category}
									stroke={strokeColor}
									strokeWidth={strokeWidth}
								/>
							);
						})}
					</RechartsLineChart>
				</ResponsiveContainer>
			</div>
		);
	},
);

LineChart.displayName = "LineChart";

export { LineChart, type LineChartProps };
