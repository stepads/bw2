'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface Creative {
  ad_name: string;
  thumbnail_url: string | null;
}

interface CreativeFilterProps {
  creatives: Creative[];
  selectedAdName: string;
  onSelect: (adName: string) => void;
}

export default function CreativeFilter({
  creatives,
  selectedAdName,
  onSelect,
}: CreativeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = creatives.filter((c) =>
    c.ad_name.toLowerCase().includes(search.toLowerCase())
  );

  const selected = creatives.find((c) => c.ad_name === selectedAdName);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full flex items-center gap-3 bg-bg-card border border-accent
          rounded-btn px-3 py-2.5 text-sm text-left
          hover:bg-accent/20 transition-colors
        "
      >
        {selected?.thumbnail_url && (
          <img
            src={selected.thumbnail_url}
            alt=""
            className="w-8 h-8 rounded object-cover"
          />
        )}
        <span className="flex-1 truncate">
          {selected?.ad_name || 'Selecione um criativo'}
        </span>
        <ChevronDown className="w-4 h-4 text-black/40 flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-accent rounded-card shadow-lg z-50 max-h-72 overflow-hidden">
          <div className="p-2 border-b border-accent">
            <div className="flex items-center gap-2 bg-bg-card rounded-btn px-2.5 py-1.5">
              <Search className="w-3.5 h-3.5 text-black/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar criativo..."
                className="bg-transparent text-sm flex-1 outline-none"
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-56">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-sm text-black/40 text-center">
                Nenhum criativo encontrado
              </div>
            ) : (
              filtered.map((c) => (
                <button
                  key={c.ad_name}
                  onClick={() => {
                    onSelect(c.ad_name);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 text-sm text-left
                    hover:bg-accent/30 transition-colors
                    ${c.ad_name === selectedAdName ? 'bg-accent/20' : ''}
                  `}
                >
                  {c.thumbnail_url ? (
                    <img
                      src={c.thumbnail_url}
                      alt=""
                      className="w-10 h-10 rounded object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-accent/30 flex-shrink-0" />
                  )}
                  <span className="truncate">{c.ad_name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
