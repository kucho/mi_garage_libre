import React from "react";
import {
	Cell,
	Pie,
	PieChart as RechartsPieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
	data: Record<string, any>[];
	dataKey: string;
	nameKey: string;
	colors?: string[];
	tooltipBgColor?: string;
	tooltipBorderColor?: string;
	valueFormatter?: (value: number) => string;
	showTooltip?: boolean;
	innerRadius?: number;
	outerRadius?: number;
	className?: string;
}

const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
	(
		{
			data = [],
			dataKey,
			nameKey,
			colors = [
				"var(--chart-1)",
				"var(--chart-2)",
				"var(--chart-3)",
				"var(--chart-4)",
				"var(--chart-5)",
			],
			tooltipBgColor = "var(--background)",
			tooltipBorderColor = "var(--border)",
			valueFormatter = (value: number) => value.toString(),
			showTooltip = true,
			innerRadius = 0,
			outerRadius = 100,
			className,
			...props
		},
		ref,
	) => {
		return (
			<div className={cn("h-80 w-full", className)} ref={ref} {...props}>
				<ResponsiveContainer height="100%" width="100%">
					<RechartsPieChart>
						<Pie
							className="w-full h-full"
							cx="50%"
							cy="50%"
							data={data}
							dataKey={dataKey}
							innerRadius={innerRadius}
							isAnimationActive={false}
							nameKey={nameKey}
							outerRadius={outerRadius}
						>
							{data.map((entry, index) => (
								<Cell
									fill={colors[index % colors.length]}
									key={`cell-${index}`}
								/>
							))}
						</Pie>

						{showTooltip && (
							<Tooltip
								content={({ active, payload }) => {
									if (!active || !payload?.length) return null;

									const data = payload[0];

									return (
										<div
											className="border p-2 shadow"
											style={{
												backgroundColor: tooltipBgColor,
												borderColor: tooltipBorderColor,
											}}
										>
											<div className="flex flex-col gap-1">
												<span className="text-[0.70rem] uppercase text-muted-foreground">
													{data.name}
												</span>
												<span className="font-bold text-foreground">
													{valueFormatter(data.value as number)}
												</span>
											</div>
										</div>
									);
								}}
							/>
						)}
					</RechartsPieChart>
				</ResponsiveContainer>
			</div>
		);
	},
);

PieChart.displayName = "PieChart";

export { PieChart, type PieChartProps };
