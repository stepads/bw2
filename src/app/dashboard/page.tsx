'use client';

import {
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Eye,
  RefreshCw,
  MousePointerClick,
  Target,
} from 'lucide-react';
import KPICard from '@/components/kpis/KPICard';
import WeeklyPerformance from '@/components/charts/WeeklyPerformance';
import { useKPIData } from '@/hooks/useMetaAdsData';
import { useFilters } from '@/context/FilterContext';
import {
  formatCurrency,
  formatROAS,
  formatNumber,
  formatPercent,
} from '@/lib/utils';
import { KPISkeleton, ChartSkeleton } from '@/components/layout/Skeleton';

export default function DashboardPage() {
  const { loading } = useFilters();
  const kpi = useKPIData();

  if (loading) {
    return (
      <div className="space-y-6">
        <KPISkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  const kpiCards = [
    { label: 'ROAS', value: formatROAS(kpi.roas), icon: TrendingUp },
    { label: 'Compras', value: formatNumber(kpi.purchases), icon: ShoppingCart },
    { label: 'Investimento', value: formatCurrency(kpi.investment), icon: DollarSign },
    { label: 'Impressões', value: formatNumber(kpi.impressions), icon: Eye },
    { label: 'Frequência', value: kpi.frequency.toFixed(2).replace('.', ','), icon: RefreshCw },
    { label: 'CTR', value: formatPercent(kpi.ctr), icon: MousePointerClick },
    { label: 'CP Compras', value: formatCurrency(kpi.costPerPurchase), icon: Target },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Visão Geral</h1>
        <p className="text-sm text-black/40">Métricas de performance consolidadas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <KPICard key={card.label} {...card} />
        ))}
      </div>

      <WeeklyPerformance />
    </div>
  );
}
