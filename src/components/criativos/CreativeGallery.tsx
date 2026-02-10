'use client';

import { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { useCreativeData } from '@/hooks/useMetaAdsData';
import CreativeCard from './CreativeCard';

type SortKey = 'spend' | 'roas' | 'purchases' | 'ctr';

const ITEMS_PER_PAGE = 12;

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'spend', label: 'Maior Gasto' },
  { key: 'roas', label: 'Melhor ROAS' },
  { key: 'purchases', label: 'Mais Compras' },
  { key: 'ctr', label: 'Melhor CTR' },
];

export default function CreativeGallery() {
  const creatives = useCreativeData();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('spend');
  const [page, setPage] = useState(1);

  const filteredAndSorted = useMemo(() => {
    let result = creatives;

    if (search) {
      const s = search.toLowerCase();
      result = result.filter((c) => c.ad_name.toLowerCase().includes(s));
    }

    result.sort((a, b) => b[sortBy] - a[sortBy]);

    return result;
  }, [creatives, search, sortBy]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginated = filteredAndSorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (creatives.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-black/40 text-sm">
        Selecione uma conta para visualizar os criativos
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 bg-bg-card border border-accent rounded-btn px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-black/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por nome do anúncio..."
            className="bg-transparent text-sm flex-1 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-black/40" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="bg-bg-card border border-accent rounded-btn px-3 py-2 text-sm appearance-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-xs text-black/40">
        {filteredAndSorted.length} criativo{filteredAndSorted.length !== 1 ? 's' : ''} encontrado{filteredAndSorted.length !== 1 ? 's' : ''}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((creative) => (
          <CreativeCard key={creative.ad_name} creative={creative} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border border-accent rounded-btn disabled:opacity-30 hover:bg-accent/30 transition-colors"
          >
            Anterior
          </button>
          <span className="text-sm text-black/50">
            {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm border border-accent rounded-btn disabled:opacity-30 hover:bg-accent/30 transition-colors"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}
