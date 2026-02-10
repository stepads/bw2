'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { MetaAdsRecord } from '@/types/meta-ads';
import { getMetaAdsData } from '@/lib/queries';
import { format, startOfMonth, endOfMonth } from 'date-fns';

const ACCOUNT_NAME = process.env.NEXT_PUBLIC_ACCOUNT_NAME ?? '';
const now = new Date();
const DEFAULT_START = format(startOfMonth(now), 'yyyy-MM-dd');
const DEFAULT_END = format(endOfMonth(now), 'yyyy-MM-dd');

interface FilterState {
  accountName: string;
  startDate: string;
  endDate: string;
  data: MetaAdsRecord[];
  loading: boolean;
  error: string | null;
}

interface FilterContextType extends FilterState {
  setDateRange: (start: string, end: string) => void;
  fetchData: () => Promise<void>;
}

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FilterState>({
    accountName: ACCOUNT_NAME,
    startDate: DEFAULT_START,
    endDate: DEFAULT_END,
    data: [],
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!state.accountName) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await getMetaAdsData(
        state.accountName,
        state.startDate || undefined,
        state.endDate || undefined
      );
      setState((prev) => ({ ...prev, data, loading: false }));
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: 'Erro ao carregar dados',
      }));
    }
  }, [state.accountName, state.startDate, state.endDate]);

  // Auto-fetch on mount when account_name is configured
  useEffect(() => {
    if (state.accountName) {
      fetchData();
    }
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const setDateRange = useCallback((startDate: string, endDate: string) => {
    setState((prev) => ({ ...prev, startDate, endDate }));
  }, []);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setDateRange,
        fetchData,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
