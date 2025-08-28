import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { WeightLog } from '@/types';

const chartConfig = {
  weight: {
    label: 'Weight',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function WeightChart({
  weightLogs,
}: {
  weightLogs: WeightLog[];
}) {
  const chartData = weightLogs.map((item) => ({
    date: item.date,
    weight: item.weight,
  }));
  return (
    <ChartContainer className="h-[80%]" config={chartConfig}>
      <AreaChart
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(2, 10)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7297d4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7297d4" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="weight"
          type="natural"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--chart-1)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
