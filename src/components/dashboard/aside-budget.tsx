'use client';

import { usePreviewBudget } from '@/lib/stores/preview-budget';
import { cn, formatPrice, relativeDate } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import { useEffect, useRef } from 'react';

type Props = {
  size?: 'small' | 'medium' | 'large';
};

export default function AsideBudget({ size = 'small' }: Props) {
  const { aside: open, info, closeAside } = usePreviewBudget();
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAside();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
        closeAside();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeAside, open]);

  if (!open) return null;

  const width = {
    small: 'w-[22rem]',
    medium: 'w-[32rem]',
    large: 'w-[48rem]',
  }[size];

  return (
    <aside
      ref={asideRef}
      className={cn(
        'fixed top-[64px] right-0 z-50 h-full border bg-white shadow-xl',
        width
      )}
      role="complementary"
      aria-label="Presupuestos"
    >
      <div className="relative h-full overflow-y-auto p-6">
        <button
          onClick={closeAside}
          className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          ×
        </button>

        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Presupuestos
        </h2>

        {!info ||
          (info.budget.length === 0 ? (
            <p className="text-gray-500">No hay presupuestos disponibles.</p>
          ) : (
            <ul className="space-y-4">
              {info.budget.map((budget, index) => (
                <li key={index} className="rounded border p-4 shadow-sm">
                  <div className="mb-2 border-b pb-2 text-sm">
                    {budget.details.map((detail, index) => (
                      <div key={index}>
                        {detail.description}: {formatPrice(detail.amount)}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-md text-gray-600">{budget.user.name}</p>
                    <p className="text-lg font-medium text-green-700">
                      {formatPrice(budget.budget)}
                    </p>
                  </div>
                  <p className="flex items-center gap-1 text-xs">
                    <Calendar className="size-3" />
                    <span>Recibido {relativeDate(budget.createdAt)}</span>
                  </p>
                </li>
              ))}
            </ul>
          ))}
      </div>
    </aside>
  );
}
