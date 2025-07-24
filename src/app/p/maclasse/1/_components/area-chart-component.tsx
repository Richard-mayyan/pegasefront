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
  // Custom Y-axis tick formatter to display days of the week
  // This is a simplified approach. In a real app, data would map to specific days.
  const yAxisLabels = ["Dim", "Sam", "Ven", "Jeu", "Mer", "Mar", "Lun"]; // Reversed to match visual order from bottom up

  //   const formatYAxisTick = (tick: number) => {
  const formatYAxisTick = (tick: number, index: number) => {
    // Map numerical tick values to day labels.
    // This assumes a range for the Y-axis that can be mapped to 7 days.
    // For this example, we'll just return the tick value as a number.
    // The visual labels will be placed externally.
    return tick.toFixed(2);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex">
        {/* Static Y-axis labels to match the image */}
        <div className="flex flex-col justify-between text-sm text-gray-600 pr-2 py-4">
          {yAxisLabels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
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
                <stop
                  offset="95%"
                  stopColor="hsl(174 80% 31%)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickFormatter={() => "Jan"} // Always display "Jan" as per image
              interval={0} // Show all ticks
              padding={{ left: 20, right: 20 }}
              className="text-xs text-gray-600"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatYAxisTick}
              domain={[0, 100]} // Assuming a range for the data
              className="text-xs text-gray-600"
              hide // Hide default Y-axis ticks as we have static labels
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
    </div>
  );
}
