import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';
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

  function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload || !payload.length) return null;
    const point = payload[0];
    const value = point?.value ?? '';
    return (
      <div className="bg-white/80 dark:bg-neutral-900/80 border rounded p-2 text-sm shadow">
        <div className="font-medium text-xs text-muted-foreground">{label}</div>
        <div className="mt-1 font-semibold">weight: {value} kg</div>
      </div>
    );
  }

  return (
    <ChartContainer className="h-[80%]" config={chartConfig}>
      <AreaChart
        data={chartData}
        margin={{
          top: 12,
          left: -12,
          right: 36,
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
        <YAxis
          domain={[
            (dataMin: number) => dataMin - 0.5,
            (dataMax: number) => dataMax + 0.5,
          ]}
        />
        <Tooltip content={CustomTooltip} cursor={false} />
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
