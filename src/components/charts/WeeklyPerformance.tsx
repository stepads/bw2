'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useWeeklyData } from '@/hooks/useMetaAdsData';
import { formatCurrency, formatROAS } from '@/lib/utils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;

  return (
    <div className="bg-white border border-accent rounded-card p-3 shadow-sm">
      <p className="text-xs font-medium text-black/50 mb-2">Semana {label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-black/60">{entry.name}:</span>
          <span className="font-medium">
            {entry.name === 'ROAS'
              ? formatROAS(entry.value)
              : formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function WeeklyPerformance() {
  const weeklyData = useWeeklyData();

  if (weeklyData.length === 0) {
    return (
      <div className="bg-bg-card border border-accent rounded-card p-6">
        <h3 className="text-sm font-semibold mb-4">Desempenho Semanal</h3>
        <div className="h-[300px] flex items-center justify-center text-black/40 text-sm">
          Selecione uma conta para visualizar os dados
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-accent rounded-card p-4 sm:p-6">
      <h3 className="text-sm font-semibold mb-4">Desempenho Semanal</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EBD9C6" />
          <XAxis
            dataKey="week"
            stroke="#000000"
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            stroke="#000000"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)
            }
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#EBD9C6"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v.toFixed(1)}x`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="spend"
            name="Investimento"
            stroke="#000000"
            strokeWidth={2}
            dot={{ r: 3, fill: '#000000' }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            name="Receita"
            stroke="#EBD9C6"
            strokeWidth={2}
            dot={{ r: 3, fill: '#EBD9C6' }}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="roas"
            name="ROAS"
            stroke="#888888"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
