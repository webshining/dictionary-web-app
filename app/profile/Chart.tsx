"use client";
import type { DayStatsType } from "@/types/stats";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const Chart = ({ data }: { data: DayStatsType[] }) => {
	return (
		<AreaChart style={{ width: "100%", aspectRatio: 1.618 }} data={data} responsive>
			<defs>
				<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="var(--color-foreground)" stopOpacity={1} />
					<stop offset="100%" stopColor="var(--color-foreground)" stopOpacity={0.2} />
				</linearGradient>
				<linearGradient id="areaGradientRed" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="var(--color-accent)" stopOpacity={1} />
					<stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.2} />
				</linearGradient>
				<linearGradient id="areaGradientGreen" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="var(--color-success)" stopOpacity={1} />
					<stop offset="100%" stopColor="var(--color-success)" stopOpacity={0.2} />
				</linearGradient>
			</defs>

			<CartesianGrid />

			<XAxis dataKey="date" height="auto" tick={{ fontSize: 12 }} />
			<YAxis width="auto" tick={{ fontSize: 12 }} />

			<Area
				type="monotone"
				dataKey="total"
				fill="url(#areaGradient)"
				stroke="var(--color-foreground)"
				strokeWidth={2}
				isAnimationActive
				animationDuration={300}
			/>
			<Area
				type="monotone"
				dataKey="success"
				fill="url(#areaGradientGreen)"
				stroke="var(--color-foreground)"
				strokeWidth={2}
				isAnimationActive
				animationDuration={600}
			/>
			<Area
				type="monotone"
				dataKey="failure"
				fill="url(#areaGradientRed)"
				stroke="var(--color-foreground)"
				strokeWidth={2}
				isAnimationActive
				animationDuration={900}
			/>

			<Tooltip />
		</AreaChart>
	);
};

export default Chart;
