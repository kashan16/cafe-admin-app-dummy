'use client';

import { Card, CardContent } from '@/components/ui/card';
import { IndianRupee, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import InlineLoader from './InlineLoader';

export default function StatsSidebar() {
  // 🧪 Dummy state
  const [loading, setLoading] = useState(true);
  const [todayCount, setTodayCount] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);

  // 🧪 Simulate fetch
  useEffect(() => {
    const t = setTimeout(() => {
      setTodayCount(18);
      setDailyTotal(7420);
      setLoading(false);
    }, 900);

    return () => clearTimeout(t);
  }, []);

  const onOpenAnalytics = () => {
    toast.info('Open analytics (dummy)');
  };

  return (
    <aside className="order-2 lg:order-1">
      <div className="lg:sticky lg:top-20" onClick={onOpenAnalytics}>
        <Card className="rounded-xl bg-card/60 border-border backdrop-blur-md shadow-md cursor-pointer">
          <CardContent className="p-5 sm:p-6">

            {/* Today Count */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Orders Today
                </p>
                <p className="text-3xl font-bold mt-1 text-foreground">
                  {loading ? <InlineLoader /> : todayCount}
                </p>
              </div>

              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>

            {/* Daily Total */}
            <div className="mt-5 border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Total Amount Today
                  </p>
                  <p className="text-3xl font-bold mt-1 text-foreground">
                    {loading ? (
                      <InlineLoader />
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <IndianRupee className="w-5 h-5" />
                        {dailyTotal}
                      </span>
                    )}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <IndianRupee className="h-6 w-6 text-green-500 dark:text-green-300" />
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        <div className="h-4" />
      </div>
    </aside>
  );
}
