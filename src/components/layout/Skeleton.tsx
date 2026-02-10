'use client';

export function KPISkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-bg-card border border-accent rounded-card p-5 animate-pulse"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-16 bg-accent/40 rounded" />
            <div className="w-8 h-8 bg-accent/40 rounded-btn" />
          </div>
          <div className="h-7 w-24 bg-accent/40 rounded" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-bg-card border border-accent rounded-card p-6 animate-pulse">
      <div className="h-4 w-40 bg-accent/40 rounded mb-4" />
      <div className="h-[350px] bg-accent/20 rounded-btn" />
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-bg-card border border-accent rounded-card overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-accent/20" />
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 bg-accent/40 rounded" />
            <div className="h-3 w-1/2 bg-accent/40 rounded" />
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="h-8 bg-accent/20 rounded" />
              <div className="h-8 bg-accent/20 rounded" />
              <div className="h-8 bg-accent/20 rounded" />
              <div className="h-8 bg-accent/20 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
