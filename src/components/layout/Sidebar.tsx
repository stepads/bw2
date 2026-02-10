'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BarChart3, ImageIcon, Filter, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/dashboard', label: 'Visão Geral', icon: BarChart3 },
  { href: '/criativos', label: 'Criativos', icon: ImageIcon },
  { href: '/retencao', label: 'Funil & Retenção', icon: Filter },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-[240px] bg-white border-r border-accent z-50
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-accent">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="BW2" width={80} height={32} className="h-7 w-auto" />
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-accent/50 rounded-btn transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="p-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm font-medium
                  transition-colors duration-150
                  ${
                    isActive
                      ? 'bg-accent text-black'
                      : 'text-black/70 hover:bg-accent/50 hover:text-black'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
