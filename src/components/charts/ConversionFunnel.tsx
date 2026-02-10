'use client';

import { useFunnelData } from '@/hooks/useMetaAdsData';
import { formatNumber, formatPercent } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

const COLORS = ['#000000', '#1a1a1a', '#444444', '#777777', '#EBD9C6'];

export default function ConversionFunnel() {
  const funnelData = useFunnelData();

  if (funnelData.length === 0 || funnelData[0].value === 0) {
    return (
      <div className="bg-bg-card border border-accent rounded-card p-6">
        <h3 className="text-sm font-semibold mb-4">Funil de Conversão</h3>
        <div className="h-[300px] flex items-center justify-center text-black/40 text-sm">
          Sem dados para exibir
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-accent rounded-card p-4 sm:p-6">
      <h3 className="text-sm font-semibold mb-6">Funil de Conversão</h3>

      <div className="flex flex-col items-center gap-0">
        {funnelData.map((step, i) => {
          const widthPercent = Math.max(step.totalRate, 12);
          const isLight = i >= 3;

          return (
            <div key={step.label} className="w-full flex flex-col items-center">
              {i > 0 && (
                <div className="flex items-center gap-2 py-1.5">
                  <ArrowDown className="w-3.5 h-3.5 text-black/25" />
                  <span className="text-[11px] font-medium text-black/40">
                    {formatPercent(step.conversionRate)}
                  </span>
                </div>
              )}
              <div
                className="relative rounded-lg flex items-center justify-center py-3 px-4 transition-all"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: COLORS[i],
                  minWidth: '140px',
                }}
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span
                    className={`text-[11px] font-medium ${
                      isLight ? 'text-black/60' : 'text-white/70'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      isLight ? 'text-black' : 'text-white'
                    }`}
                  >
                    {formatNumber(step.value)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
