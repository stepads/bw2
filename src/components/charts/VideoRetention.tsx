'use client';

import { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { useRetentionData, useVideoCreatives } from '@/hooks/useMetaAdsData';
import { useFilters } from '@/context/FilterContext';
import { safeNumber } from '@/lib/utils';
import CreativeFilter from '@/components/filters/CreativeFilter';
import { formatNumber, formatPercent } from '@/lib/utils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { label: string; percentage: number; absolute: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.[0]) return null;
  const data = payload[0].payload;

  return (
    <div className="bg-white border border-accent rounded-card p-3 shadow-sm">
      <p className="text-sm font-medium mb-1">{data.label}</p>
      <p className="text-xs text-black/60">
        Retenção: <span className="font-medium text-black">{formatPercent(data.percentage)}</span>
      </p>
      <p className="text-xs text-black/60">
        Absoluto: <span className="font-medium text-black">{formatNumber(data.absolute)}</span>
      </p>
    </div>
  );
}

export default function VideoRetention() {
  const [selectedAdName, setSelectedAdName] = useState('');
  const videoCreatives = useVideoCreatives();
  const retentionData = useRetentionData(selectedAdName || undefined);
  const { data } = useFilters();

  const avgWatchTime = selectedAdName
    ? data
        .filter((d) => d.ad_name === selectedAdName)
        .reduce((sum, d) => sum + safeNumber(d.video_avg_time_watched_actions_video_view), 0) /
      Math.max(
        data.filter((d) => d.ad_name === selectedAdName).length,
        1
      )
    : 0;

  return (
    <div className="bg-bg-card border border-accent rounded-card p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-sm font-semibold">Retenção de Vídeo</h3>
        <CreativeFilter
          creatives={videoCreatives}
          selectedAdName={selectedAdName}
          onSelect={setSelectedAdName}
        />
      </div>

      {retentionData.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-black/40 text-sm">
          {videoCreatives.length === 0
            ? 'Nenhum criativo com vídeo encontrado'
            : 'Selecione um criativo para ver a retenção'}
        </div>
      ) : (
        <>
          {avgWatchTime > 0 && (
            <div className="mb-4 inline-flex items-center gap-2 bg-accent/20 px-3 py-1.5 rounded-btn">
              <span className="text-xs text-black/50">Tempo médio assistido:</span>
              <span className="text-xs font-medium">{avgWatchTime.toFixed(1)}s</span>
            </div>
          )}

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={retentionData}>
              <defs>
                <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EBD9C6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EBD9C6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EBD9C6" />
              <XAxis
                dataKey="label"
                stroke="#000000"
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                stroke="#000000"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v.toFixed(0)}%`}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#000000"
                strokeWidth={2}
                fill="url(#retentionGradient)"
                dot={{ r: 4, fill: '#000000' }}
                activeDot={{ r: 6, fill: '#000000' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
