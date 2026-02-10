'use client';

import { memo, useState } from 'react';
import { X } from 'lucide-react';
import { CreativeData } from '@/types/meta-ads';
import { formatCurrency, formatROAS, formatPercent, formatNumber } from '@/lib/utils';

interface CreativeCardProps {
  creative: CreativeData;
}

function CreativeCard({ creative }: CreativeCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="
          bg-bg-card border border-accent rounded-card overflow-hidden cursor-pointer
          hover:shadow-md hover:border-black/20 transition-all duration-200
          group
        "
      >
        <div className="relative aspect-square bg-accent/10 overflow-hidden">
          {creative.thumbnail_url ? (
            <img
              src={creative.thumbnail_url}
              alt={creative.ad_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-black/20 text-sm">
              Sem imagem
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4">
          <h4 className="text-sm font-medium truncate mb-1">{creative.ad_name}</h4>
          <p className="text-xs text-black/50 truncate mb-3">{creative.campaign}</p>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-black/40 uppercase">Spend</span>
              <p className="text-xs font-medium">{formatCurrency(creative.spend)}</p>
            </div>
            <div>
              <span className="text-[10px] text-black/40 uppercase">ROAS</span>
              <p className="text-xs font-medium">{formatROAS(creative.roas)}</p>
            </div>
            <div>
              <span className="text-[10px] text-black/40 uppercase">Compras</span>
              <p className="text-xs font-medium">{formatNumber(creative.purchases)}</p>
            </div>
            <div>
              <span className="text-[10px] text-black/40 uppercase">CTR</span>
              <p className="text-xs font-medium">{formatPercent(creative.ctr)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-card max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-accent">
              <h3 className="text-sm font-semibold truncate pr-4">{creative.ad_name}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-accent/50 rounded-btn transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {creative.thumbnail_url && (
              <div className="relative aspect-video">
                <img
                  src={creative.thumbnail_url}
                  alt={creative.ad_name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-4 space-y-3">
              <div>
                <span className="text-xs text-black/40">Conjunto de Anúncios</span>
                <p className="text-sm">{creative.adset_name}</p>
              </div>
              <div>
                <span className="text-xs text-black/40">Campanha</span>
                <p className="text-sm">{creative.campaign}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-accent">
                <div>
                  <span className="text-[10px] text-black/40 uppercase">Spend</span>
                  <p className="text-sm font-medium">{formatCurrency(creative.spend)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-black/40 uppercase">ROAS</span>
                  <p className="text-sm font-medium">{formatROAS(creative.roas)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-black/40 uppercase">Compras</span>
                  <p className="text-sm font-medium">{formatNumber(creative.purchases)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-black/40 uppercase">CTR</span>
                  <p className="text-sm font-medium">{formatPercent(creative.ctr)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-black/40 uppercase">CPM</span>
                  <p className="text-sm font-medium">{formatCurrency(creative.cpm)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-black/40 uppercase">CPC</span>
                  <p className="text-sm font-medium">{formatCurrency(creative.cpc)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-black/40 uppercase">Impressões</span>
                  <p className="text-sm font-medium">{formatNumber(creative.impressions)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(CreativeCard);
