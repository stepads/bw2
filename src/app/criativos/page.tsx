'use client';

import { useFilters } from '@/context/FilterContext';
import CreativeGallery from '@/components/criativos/CreativeGallery';
import { GallerySkeleton } from '@/components/layout/Skeleton';

export default function CriativosPage() {
  const { loading } = useFilters();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold">Criativos</h1>
        <p className="text-sm text-black/40">Galeria de anúncios com métricas de performance</p>
      </div>

      {loading ? <GallerySkeleton /> : <CreativeGallery />}
    </div>
  );
}
