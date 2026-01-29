/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { menuData } from '@/lib/menu';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface MenuAvailabilitySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MenuAvailabilitySheet({
  isOpen,
  onClose,
}: MenuAvailabilitySheetProps) {
  // 🧪 Dummy state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const [availability, setAvailability] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        menuData.map((item) => [item.id, item.available ?? true])
      )
  );

  // 🧪 Dummy helpers
  function isAvailable(id: string, fallback: boolean) {
    return availability[id] ?? fallback;
  }

  async function handleToggle(itemId: string, next: boolean) {
    setTogglingId(itemId);

    setTimeout(() => {
      setAvailability((prev) => ({
        ...prev,
        [itemId]: next,
      }));
      setTogglingId(null);
      toast.success(next ? 'Item enabled' : 'Item disabled', {
        description: 'Availability updated (dummy)',
      });
    }, 600);
  }

  async function handleRefresh() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.info('Menu availability refreshed (dummy)');
    }, 700);
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="flex h-dvh w-full flex-col p-0 sm:max-w-lg"
      >
        {/* Header */}
        <SheetHeader className="border-b bg-background px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <SheetTitle className="text-base font-semibold">
              Menu Availability
            </SheetTitle>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <div className="text-xs text-muted-foreground">
              Showing {menuData.length} item
              {menuData.length !== 1 ? 's' : ''}
            </div>

            {loading && (
              <div className="rounded-xl border bg-muted px-3 py-2 text-sm">
                Loading availability...
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>
        </SheetHeader>

        {/* Scrollable List */}
        <div className="no-scrollbar flex-1 overflow-y-auto px-4 py-4">
          {menuData.length === 0 ? (
            <div className="rounded-xl border bg-muted/40 p-4 text-sm">
              <div className="font-medium">No items found</div>
              <div className="mt-1 text-muted-foreground">
                Menu is currently empty
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {menuData.map((item) => {
                const enabled = isAvailable(
                  item.id,
                  item.available ?? true
                );
                const busy = togglingId === item.id;

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border bg-background p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">
                          {item.name}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>₹{item.price}</span>
                          <span className="rounded-full border px-2 py-0.5">
                            {item.category}
                          </span>
                        </div>

                        <div className="mt-2 text-[11px] text-muted-foreground">
                          ID:{' '}
                          <span className="font-mono">{item.id}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Switch
                          checked={enabled}
                          disabled={busy}
                          onCheckedChange={(next) =>
                            handleToggle(item.id, next)
                          }
                          className="data-[state=checked]:bg-green-600"
                        />

                        <div className="text-xs text-muted-foreground">
                          {busy
                            ? 'Saving…'
                            : enabled
                            ? 'Available'
                            : 'Unavailable'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-background px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="h-10 rounded-xl"
            >
              Close
            </Button>

            <Button
              onClick={handleRefresh}
              className="h-10 rounded-xl"
              disabled={loading}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh All
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
