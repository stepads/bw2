'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { useFunnelData } from '@/hooks/useMetaAdsData';
import { formatNumber, formatPercent } from '@/lib/utils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { label: string; value: number; conversionRate: number; totalRate: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.[0]) return null;
  const data = payload[0].payload;

  return (
    <div className="bg-white border border-accent rounded-card p-3 shadow-sm">
      <p className="text-sm font-medium mb-1">{data.label}</p>
      <p className="text-xs text-black/60">
        Volume: <span className="font-medium text-black">{formatNumber(data.value)}</span>
      </p>
      <p className="text-xs text-black/60">
        Taxa (etapa anterior):{' '}
        <span className="font-medium text-black">{formatPercent(data.conversionRate)}</span>
      </p>
      <p className="text-xs text-black/60">
        Taxa (total):{' '}
        <span className="font-medium text-black">{formatPercent(data.totalRate)}</span>
      </p>
    </div>
  );
}

const COLORS = ['#000000', '#333333', '#666666', '#999999', '#EBD9C6'];

export default function ConversionFunnel() {
  const funnelData = useFunnelData();

  if (funnelData.length === 0 || funnelData[0].value === 0) {
    return (
      <div className="bg-bg-card border border-accent rounded-card p-6">
        <h3 className="text-sm font-semibold mb-4">Funil de Conversão</h3>
        <div className="h-[300px] flex items-center justify-center text-black/40 text-sm">
          Selecione uma conta para visualizar o funil
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-accent rounded-card p-4 sm:p-6">
      <h3 className="text-sm font-semibold mb-4">Funil de Conversão</h3>

      <div className="flex flex-col gap-3 mb-6">
        {funnelData.map((step, i) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className="w-32 sm:w-40 text-right">
              <span className="text-xs font-medium text-black/70">{step.label}</span>
            </div>
            <div className="flex-1 relative">
              <div
                className="h-8 rounded-btn flex items-center px-3 transition-all"
                style={{
                  width: `${Math.max(step.totalRate, 3)}%`,
                  backgroundColor: COLORS[i],
                }}
              >
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    i < 3 ? 'text-white' : 'text-black'
                  }`}
                >
                  {formatNumber(step.value)}
                </span>
              </div>
            </div>
            {i > 0 && (
              <span className="text-xs text-black/50 w-16 text-right">
                {formatPercent(step.conversionRate)}
              </span>
            )}
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={funnelData} layout="vertical">
          <XAxis type="number" hide />
          <YAxis
            dataKey="label"
            type="category"
            width={110}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]}>
            {funnelData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
