'use client';

import { useFilters } from '@/context/FilterContext';
import ConversionFunnel from '@/components/charts/ConversionFunnel';
import VideoRetention from '@/components/charts/VideoRetention';
import { ChartSkeleton } from '@/components/layout/Skeleton';

export default function RetencaoPage() {
  const { loading } = useFilters();

  if (loading) {
    return (
      <div className="space-y-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Funil & Retenção</h1>
        <p className="text-sm text-black/40">Análise de conversão e retenção de vídeo</p>
      </div>

      <ConversionFunnel />
      <VideoRetention />
    </div>
  );
}
