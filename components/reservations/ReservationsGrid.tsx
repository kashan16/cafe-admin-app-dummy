'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

import { dummyReservations } from '@/lib/dummyReservations';
import { Reservation, ReservationStatus } from '@/types';
import EmptyState from '../dashboard/EmptyState';
import SkeletonCard from '../dashboard/SkeletonCard';
import ReservationCard from './ReservationCard';

const SKELETON_COUNT = 8;

type FilterType = 'ALL' | ReservationStatus;

/* -----------------------------------------
 * LABELS
 * ----------------------------------------*/
const STATUS_LABEL: Record<FilterType, string> = {
  ALL: 'All',
  pending: 'Pending',
  reserved: 'Reserved',
  cancelled: 'Cancelled',
};

/* -----------------------------------------
 * TINT STYLES (match OrdersGrid)
 * ----------------------------------------*/
const STATUS_TINT_STYLES: Record<ReservationStatus, string> = {
  pending:
    'bg-yellow-100 border-yellow-200 dark:bg-yellow-500/10 dark:border-yellow-500/20',
  reserved:
    'bg-green-100 border-green-200 dark:bg-green-500/10 dark:border-green-500/20',
  cancelled:
    'bg-red-100 border-red-200 dark:bg-red-500/10 dark:border-red-500/20',
};

export default function ReservationsGrid({
  onSelect,
}: {
  onSelect: (r: Reservation) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<FilterType>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  // 🧪 simulate fetch delay
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  /* -----------------------------------------
   * FILTERED DATA
   * ----------------------------------------*/
  const visibleReservations = useMemo(() => {
    if (statusFilter === 'ALL') return dummyReservations;
    return dummyReservations.filter((r) => r.status === statusFilter);
  }, [statusFilter]);

  /* -----------------------------------------
   * LOADING STATE
   * ----------------------------------------*/
  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* filter skeleton */}
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 rounded-full bg-muted animate-pulse border"
            />
          ))}
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  /* -----------------------------------------
   * EMPTY STATE
   * ----------------------------------------*/
  if (dummyReservations.length === 0) {
    return <EmptyState />;
  }

  /* -----------------------------------------
   * DATA STATE
   * ----------------------------------------*/
  return (
    <div className="space-y-4">
      {/*FILTER BAR*/}
      <div className="flex flex-wrap gap-2 justify-center">
        {(['ALL', 'pending', 'reserved', 'cancelled'] as FilterType[]).map(
          (s) => {
            const active = statusFilter === s;
            const isAll = s === 'ALL';

            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={[
                  'px-4 py-2 rounded-full text-sm font-semibold border transition-all',
                  isAll
                    ? active
                      ? 'bg-black text-white border-neutral-700'
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                    : [
                        STATUS_TINT_STYLES[s],
                        active
                          ? 'ring-2 ring-neutral-900/10 dark:ring-white/10'
                          : 'opacity-80 hover:opacity-100',
                      ].join(' '),
                ].join(' ')}
              >
                {STATUS_LABEL[s]}
              </button>
            );
          }
        )}
      </div>

      {/* NO RESULTS AFTER FILTER */}
      {visibleReservations.length === 0 ? (
        <div className="rounded-2xl border bg-muted p-6 text-center text-sm text-muted-foreground">
          No {STATUS_LABEL[statusFilter]} reservations found.
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence initial={false}>
            {visibleReservations.map((r) => (
              <ReservationCard
                key={r.id}
                reservation={r}
                onClick={() => onSelect(r)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
