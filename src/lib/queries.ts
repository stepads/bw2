import { getSupabase } from './supabase';
import { MetaAdsRecord } from '@/types/meta-ads';

export async function getMetaAdsData(
  accountName: string,
  startDate?: string,
  endDate?: string
): Promise<MetaAdsRecord[]> {
  const supabase = getSupabase();
  const allData: MetaAdsRecord[] = [];
  const PAGE_SIZE = 1000;
  let from = 0;
  let hasMore = true;

  while (hasMore) {
    let query = supabase
      .from('meta_ads_step')
      .select('*')
      .eq('account_name', accountName)
      .range(from, from + PAGE_SIZE - 1);

    if (startDate) query = query.gte('date', startDate);
    if (endDate) query = query.lte('date', endDate);

    const { data, error } = await query;
    if (error) throw error;

    const rows = (data as MetaAdsRecord[]) ?? [];
    allData.push(...rows);

    if (rows.length < PAGE_SIZE) {
      hasMore = false;
    } else {
      from += PAGE_SIZE;
    }
  }

  return allData;
}
