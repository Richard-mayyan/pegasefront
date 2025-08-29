"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AreaChartComponentProps {
  title: string;
  data: { name: string; value: number }[];
  id: string;
}

export default function AreaChartComponent({
  title,
  data,
  id,
}: AreaChartComponentProps) {
  // Calculer la valeur maximale pour définir le domaine de l'axe Y
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  // Formatter les valeurs de l'axe Y
  const formatYAxisTick = (tick: number) => {
    return Math.round(tick).toString();
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={`colorUv-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(174 80% 31%)"
                stopOpacity={0.8}
              />
              <stop offset="95%" stopColor="hsl(174 80% 31%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value.substring(0, 3)}
            interval={0}
            padding={{ left: 20, right: 20 }}
            className="text-xs text-gray-600"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatYAxisTick}
            domain={[0, maxValue]}
            className="text-xs text-gray-600"
          />
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e0e0e0"
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(174 80% 31%)"
            fillOpacity={1}
            fill={`url(#colorUv-${id})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
