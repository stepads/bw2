'use client';

import { Menu, Building2 } from 'lucide-react';
import { useFilters } from '@/context/FilterContext';
import DateRangeFilter from '@/components/filters/DateRangeFilter';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { accountName } = useFilters();

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-accent z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-accent/50 rounded-btn transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4 text-black/50" />
            <span className="font-medium">{accountName}</span>
          </div>
        </div>
        <DateRangeFilter />
      </div>
    </header>
  );
}
