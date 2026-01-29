'use client';

import InlineLoader from '@/components/dashboard/InlineLoader';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarClock, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ReservationStatsSidebar() {
  // 🧪 Dummy state
  const [loading, setLoading] = useState(true);
  const [todayReservations, setTodayReservations] = useState(0);
  const [upcomingReservations, setUpcomingReservations] = useState(0);

  // 🧪 Simulate fetch
  useEffect(() => {
    const t = setTimeout(() => {
      setTodayReservations(6);
      setUpcomingReservations(14);
      setLoading(false);
    }, 900);

    return () => clearTimeout(t);
  }, []);

  const onOpenAnalytics = () => {
    toast.info('Open reservations analytics (dummy)');
  };

  return (
    <aside className="order-2 lg:order-1">
      <div className="lg:sticky lg:top-20" onClick={onOpenAnalytics}>
        <Card className="rounded-xl bg-card/60 border-border backdrop-blur-md shadow-md cursor-pointer">
          <CardContent className="p-5 sm:p-6">

            {/* Today's Reservations */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Reservations Today
                </p>
                <p className="text-3xl font-bold mt-1 text-foreground">
                  {loading ? <InlineLoader /> : todayReservations}
                </p>
              </div>

              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <CalendarClock className="h-6 w-6 text-primary" />
              </div>
            </div>

            {/* Upcoming Reservations */}
            <div className="mt-5 border-t border-border pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Upcoming Reservations
                  </p>
                  <p className="text-3xl font-bold mt-1 text-foreground">
                    {loading ? <InlineLoader /> : upcomingReservations}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Users className="h-6 w-6 text-blue-500 dark:text-blue-300" />
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
