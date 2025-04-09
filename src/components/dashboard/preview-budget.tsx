'use client';

import Button from '@/components/ui/button';
import { previewBudget } from '@/lib/actions/preview-budget';
import { usePreviewBudget } from '@/lib/stores/preview-budget';
import { useState } from 'react';

export function PreviewBudget({ id }: { id: number }) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { openAside } = usePreviewBudget();

  const handleClick = async () => {
    setIsPending(true);
    const data = await previewBudget(id);
    setIsPending(false);
    openAside(data);
  };

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      className="ml-auto p-1 px-3 text-xs"
      disabled={isPending}
    >
      {isPending ? 'cargando...' : 'Ver presupuestos'}
    </Button>
  );
}
