'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function PaginationControls() {
  // 🧪 Dummy pagination state
  const [page, setPage] = useState(1);
  const totalPages = 5; // change this to test UI

  if (totalPages <= 1) return null;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const goToPage = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      {/* Page Indicator */}
      <div
        className="text-sm text-muted-foreground"
        aria-live="polite"
      >
        Page {page} of {totalPages}
      </div>

      {/* Desktop Controls */}
      <div className="hidden sm:flex items-center gap-3">
        <Button
          variant="outline"
          className="border-border text-foreground"
          disabled={!canGoPrev}
          aria-label="Previous page"
          onClick={() => goToPage(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="border-border text-foreground"
          disabled={!canGoNext}
          aria-label="Next page"
          onClick={() => goToPage(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile Controls */}
      <div className="flex sm:hidden w-full justify-between gap-2">
        <Button
          className="w-1/3"
          disabled={!canGoPrev}
          aria-label="Previous page"
          onClick={() => goToPage(page - 1)}
        >
          Prev
        </Button>

        <div className="w-1/3 text-center text-muted-foreground">
          {page}
        </div>

        <Button
          className="w-1/3"
          disabled={!canGoNext}
          aria-label="Next page"
          onClick={() => goToPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
