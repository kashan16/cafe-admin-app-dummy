'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AnalyticsModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-4xl w-[92%]
          max-h-[85vh] overflow-y-auto
          p-4 sm:p-6
          rounded-3xl
          bg-white/10 dark:bg-black/30
          backdrop-blur-xl
          border border-white/20 dark:border-white/10
          shadow-2xl
          no-scrollbar
        "
      >
        {/* HEADER */}
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold text-foreground">
            Analytics Overview
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Revenue trends and top-selling items
          </p>
        </DialogHeader>

        {/* CONTENT */}
        <div className="space-y-6">
          
          {/* Earnings Chart Section */}
          <section className="bg-muted/60 border border-border rounded-2xl p-4">
            <h3 className="text-base font-semibold text-foreground mb-1">
              Total Earnings
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Weekly, monthly, and yearly revenue trends
            </p>

            {/* 🧪 Dummy Chart Placeholder */}
            <div className="h-56 rounded-xl bg-gradient-to-br from-muted/80 to-muted flex items-center justify-center text-sm text-muted-foreground border border-dashed border-border">
              Earnings Chart (Dummy)
            </div>
          </section>

          {/* Top Items Pie Section */}
          <section className="bg-muted/60 border border-border rounded-2xl p-4">
            <h3 className="text-base font-semibold text-foreground mb-1">
              Top Selling Items
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Highest contributing items by quantity sold
            </p>

            {/* 🧪 Dummy Pie Placeholder */}
            <div className="h-56 rounded-xl bg-gradient-to-br from-muted/80 to-muted flex items-center justify-center text-sm text-muted-foreground border border-dashed border-border">
              Top Items Pie Chart (Dummy)
            </div>
          </section>

        </div>
      </DialogContent>
    </Dialog>
  );
}
