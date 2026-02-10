'use client';

import { useMemo } from 'react';
import { useFilters } from '@/context/FilterContext';
import { KPIData, WeeklyData, CreativeData, RetentionPoint } from '@/types/meta-ads';
import { safeNumber, safeDivide } from '@/lib/utils';
import { startOfWeek, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function useKPIData(): KPIData {
  const { data } = useFilters();

  return useMemo(() => {
    const totalSpend = data.reduce((sum, d) => sum + safeNumber(d.spend), 0);
    const totalRevenue = data.reduce(
      (sum, d) => sum + safeNumber(d.action_values_omni_purchase),
      0
    );
    const totalPurchases = data.reduce(
      (sum, d) => sum + safeNumber(d.actions_offsite_conversion_fb_pixel_purchase),
      0
    );
    const totalImpressions = data.reduce(
      (sum, d) => sum + safeNumber(d.impressions),
      0
    );
    const totalClicks = data.reduce(
      (sum, d) => sum + safeNumber(d.link_clicks),
      0
    );
    const rowCount = data.length;
    const avgFrequency = rowCount > 0
      ? data.reduce((sum, d) => sum + safeDivide(safeNumber(d.impressions), 1), 0) / rowCount
      : 0;

    return {
      roas: safeDivide(totalRevenue, totalSpend),
      purchases: totalPurchases,
      investment: totalSpend,
      impressions: totalImpressions,
      frequency: avgFrequency,
      ctr: safeDivide(totalClicks, totalImpressions) * 100,
      costPerPurchase: safeDivide(totalSpend, totalPurchases),
    };
  }, [data]);
}

export function useWeeklyData(): WeeklyData[] {
  const { data } = useFilters();

  return useMemo(() => {
    const weeklyMap = new Map<
      string,
      { spend: number; revenue: number; sortKey: string }
    >();

    data.forEach((d) => {
      const weekStart = startOfWeek(new Date(d.date), { weekStartsOn: 1 });
      const sortKey = format(weekStart, 'yyyy-MM-dd');

      const existing = weeklyMap.get(sortKey) ?? { spend: 0, revenue: 0, sortKey };
      weeklyMap.set(sortKey, {
        spend: existing.spend + safeNumber(d.spend),
        revenue: existing.revenue + safeNumber(d.action_values_omni_purchase),
        sortKey,
      });
    });

    return Array.from(weeklyMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([sortKey, vals]) => {
        const weekStart = new Date(sortKey);
        return {
          week: format(weekStart, 'dd/MM', { locale: ptBR }),
          spend: vals.spend,
          revenue: vals.revenue,
          roas: safeDivide(vals.revenue, vals.spend),
        };
      });
  }, [data]);
}

export function useCreativeData(): CreativeData[] {
  const { data } = useFilters();

  return useMemo(() => {
    const creativeMap = new Map<
      string,
      {
        ad_name: string;
        adset_name: string;
        campaign: string;
        thumbnail_url: string | null;
        spend: number;
        revenue: number;
        purchases: number;
        clicks: number;
        impressions: number;
        cpmSum: number;
        cpcSum: number;
        count: number;
      }
    >();

    data.forEach((d) => {
      const key = d.ad_name;
      const existing = creativeMap.get(key);

      if (existing) {
        existing.spend += safeNumber(d.spend);
        existing.revenue += safeNumber(d.action_values_omni_purchase);
        existing.purchases += safeNumber(d.actions_offsite_conversion_fb_pixel_purchase);
        existing.clicks += safeNumber(d.link_clicks);
        existing.impressions += safeNumber(d.impressions);
        existing.cpmSum += safeNumber(d.cpm);
        existing.cpcSum += safeNumber(d.cpc);
        existing.count += 1;
        if (!existing.thumbnail_url && d.thumbnail_url) {
          existing.thumbnail_url = d.thumbnail_url;
        }
      } else {
        creativeMap.set(key, {
          ad_name: d.ad_name,
          adset_name: d.adset_name,
          campaign: d.campaign,
          thumbnail_url: d.thumbnail_url,
          spend: safeNumber(d.spend),
          revenue: safeNumber(d.action_values_omni_purchase),
          purchases: safeNumber(d.actions_offsite_conversion_fb_pixel_purchase),
          clicks: safeNumber(d.link_clicks),
          impressions: safeNumber(d.impressions),
          cpmSum: safeNumber(d.cpm),
          cpcSum: safeNumber(d.cpc),
          count: 1,
        });
      }
    });

    return Array.from(creativeMap.values()).map((c) => ({
      ad_name: c.ad_name,
      adset_name: c.adset_name,
      campaign: c.campaign,
      thumbnail_url: c.thumbnail_url,
      spend: c.spend,
      roas: safeDivide(c.revenue, c.spend),
      purchases: c.purchases,
      ctr: safeDivide(c.clicks, c.impressions) * 100,
      cpm: safeDivide(c.cpmSum, c.count),
      cpc: safeDivide(c.cpcSum, c.count),
      impressions: c.impressions,
    }));
  }, [data]);
}

export function useRetentionData(adName?: string): RetentionPoint[] {
  const { data } = useFilters();

  return useMemo(() => {
    const filtered = adName ? data.filter((d) => d.ad_name === adName) : data;

    const totals = filtered.reduce(
      (acc, d) => ({
        play: acc.play + safeNumber(d.video_play_actions_video_view),
        continuous2s: acc.continuous2s + safeNumber(d.video_continuous_2_sec_watched_actions_video_view),
        p25: acc.p25 + safeNumber(d.video_p25_watched_actions_video_view),
        p50: acc.p50 + safeNumber(d.video_p50_watched_actions_video_view),
        p75: acc.p75 + safeNumber(d.video_p75_watched_actions_video_view),
        p100: acc.p100 + safeNumber(d.video_p100_watched_actions_video_view),
        thruplay: acc.thruplay + safeNumber(d.video_thruplay_watched_actions_video_view),
      }),
      { play: 0, continuous2s: 0, p25: 0, p50: 0, p75: 0, p100: 0, thruplay: 0 }
    );

    if (totals.play === 0) return [];

    return [
      { label: 'Play', percentage: 100, absolute: totals.play },
      {
        label: '2s',
        percentage: safeDivide(totals.continuous2s, totals.play) * 100,
        absolute: totals.continuous2s,
      },
      {
        label: '25%',
        percentage: safeDivide(totals.p25, totals.play) * 100,
        absolute: totals.p25,
      },
      {
        label: '50%',
        percentage: safeDivide(totals.p50, totals.play) * 100,
        absolute: totals.p50,
      },
      {
        label: '75%',
        percentage: safeDivide(totals.p75, totals.play) * 100,
        absolute: totals.p75,
      },
      {
        label: '100%',
        percentage: safeDivide(totals.p100, totals.play) * 100,
        absolute: totals.p100,
      },
      {
        label: 'ThruPlay',
        percentage: safeDivide(totals.thruplay, totals.play) * 100,
        absolute: totals.thruplay,
      },
    ];
  }, [data, adName]);
}

export function useFunnelData() {
  const { data } = useFilters();

  return useMemo(() => {
    const totals = data.reduce(
      (acc, d) => ({
        impressions: acc.impressions + safeNumber(d.impressions),
        clicks: acc.clicks + safeNumber(d.link_clicks),
        addToCart: acc.addToCart + safeNumber(d.actions_add_to_cart),
        checkout: acc.checkout + safeNumber(d.actions_initiate_checkout),
        purchases: acc.purchases + safeNumber(d.actions_offsite_conversion_fb_pixel_purchase),
      }),
      { impressions: 0, clicks: 0, addToCart: 0, checkout: 0, purchases: 0 }
    );

    const steps = [
      { label: 'Impressões', value: totals.impressions },
      { label: 'Cliques no Link', value: totals.clicks },
      { label: 'Add to Cart', value: totals.addToCart },
      { label: 'Initiate Checkout', value: totals.checkout },
      { label: 'Compras', value: totals.purchases },
    ];

    return steps.map((step, i) => ({
      ...step,
      conversionRate:
        i === 0
          ? 100
          : safeDivide(step.value, steps[i - 1].value) * 100,
      totalRate: safeDivide(step.value, steps[0].value) * 100,
    }));
  }, [data]);
}

export function useVideoCreatives() {
  const { data } = useFilters();

  return useMemo(() => {
    const creativeMap = new Map<
      string,
      { ad_name: string; thumbnail_url: string | null; hasVideo: boolean }
    >();

    data.forEach((d) => {
      if (safeNumber(d.video_play_actions_video_view) > 0) {
        const key = `${d.ad_name}__${d.thumbnail_url ?? 'no-thumb'}`;
        if (!creativeMap.has(key)) {
          creativeMap.set(key, {
            ad_name: d.ad_name,
            thumbnail_url: d.thumbnail_url,
            hasVideo: true,
          });
        }
      }
    });

    return Array.from(creativeMap.values());
  }, [data]);
}
