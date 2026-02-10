'use client';

import { useState, useRef, useEffect } from 'react';
import { useFilters } from '@/context/FilterContext';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DateRangeFilter() {
  const { startDate, endDate, setDateRange, fetchData } = useFilters();
  const [isOpen, setIsOpen] = useState(false);
  const [localStart, setLocalStart] = useState(startDate);
  const [localEnd, setLocalEnd] = useState(endDate);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalStart(startDate);
    setLocalEnd(endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApply = () => {
    setDateRange(localStart, localEnd);
    fetchData();
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalStart('');
    setLocalEnd('');
    setDateRange('', '');
    fetchData();
    setIsOpen(false);
  };

  const displayLabel = () => {
    if (startDate && endDate) {
      const s = format(new Date(startDate + 'T12:00:00'), 'dd MMM', { locale: ptBR });
      const e = format(new Date(endDate + 'T12:00:00'), 'dd MMM yyyy', { locale: ptBR });
      return `${s} – ${e}`;
    }
    if (startDate) {
      return `A partir de ${format(new Date(startDate + 'T12:00:00'), 'dd MMM yyyy', { locale: ptBR })}`;
    }
    if (endDate) {
      return `Até ${format(new Date(endDate + 'T12:00:00'), 'dd MMM yyyy', { locale: ptBR })}`;
    }
    return 'Período';
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-btn text-sm
          border transition-colors
          ${startDate || endDate
            ? 'border-black bg-black text-white hover:bg-black/80'
            : 'border-accent bg-bg-card text-black/70 hover:bg-accent/30'
          }
        `}
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>{displayLabel()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-accent rounded-card shadow-lg z-50 p-4 w-72">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-black/50 mb-1 block">Data início</label>
              <input
                type="date"
                value={localStart}
                onChange={(e) => setLocalStart(e.target.value)}
                className="
                  w-full bg-bg-card border border-accent rounded-btn px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent
                "
              />
            </div>
            <div>
              <label className="text-xs text-black/50 mb-1 block">Data fim</label>
              <input
                type="date"
                value={localEnd}
                onChange={(e) => setLocalEnd(e.target.value)}
                className="
                  w-full bg-bg-card border border-accent rounded-btn px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent
                "
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleClear}
                className="
                  flex-1 text-sm px-3 py-1.5 rounded-btn
                  border border-accent text-black/60
                  hover:bg-accent/30 transition-colors
                "
              >
                Limpar
              </button>
              <button
                onClick={handleApply}
                className="
                  flex-1 text-sm px-3 py-1.5 rounded-btn
                  bg-black text-white
                  hover:bg-black/80 transition-colors
                "
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
