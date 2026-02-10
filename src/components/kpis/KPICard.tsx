'use client';

import { LucideIcon } from 'lucide-react';
import { memo } from 'react';

interface KPICardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
}

function KPICard({ label, value, icon: Icon, trend }: KPICardProps) {
  return (
    <div className="bg-bg-card border border-accent rounded-card p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-black/50 uppercase tracking-wide">
          {label}
        </span>
        <div className="w-8 h-8 bg-accent/30 rounded-btn flex items-center justify-center">
          <Icon className="w-4 h-4 text-black/70" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-xl sm:text-2xl font-semibold tracking-tight">
          {value}
        </span>
        {trend !== undefined && trend !== 0 && (
          <span
            className={`text-xs font-medium px-1.5 py-0.5 rounded ${
              trend > 0
                ? 'text-positive bg-positive/10'
                : 'text-negative bg-negative/10'
            }`}
          >
            {trend > 0 ? '+' : ''}
            {trend.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}

export default memo(KPICard);
