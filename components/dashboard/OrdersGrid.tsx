'use client';

import { Order, OrderType } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

import { dummyOrders } from '@/lib/dummyOrders';
import EmptyState from './EmptyState';
import OrderCard from './OrderCard';
import SkeletonCard from './SkeletonCard';

interface OrdersGridProps {
  onSelectOrder: (order: Order) => void;
}

const SKELETON_COUNT = 8;

type FilterType = 'ALL' | OrderType;

const ORDER_TYPE_LABEL: Record<FilterType, string> = {
  ALL: 'All',
  DINE_IN: 'Table',
  PACK: 'Pack',
  ORDER: 'Delivery',
};

const TYPE_TINT_STYLES: Record<OrderType, string> = {
  DINE_IN:
    'bg-red-100 border-red-200 dark:bg-red-500/10 dark:border-red-500/20',
  PACK:
    'bg-yellow-100 border-yellow-200 dark:bg-yellow-500/10 dark:border-yellow-500/20',
  ORDER:
    'bg-green-100 border-green-200 dark:bg-green-500/10 dark:border-green-500/20',
};

export default function OrdersGrid({ onSelectOrder }: OrdersGridProps) {
  const [typeFilter, setTypeFilter] = useState<FilterType>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  // 🧪 simulate fetch delay
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const orders = dummyOrders;

  /* -----------------------------------------
   * FILTERED DATA
   * ----------------------------------------*/
  const visibleOrders = useMemo(() => {
    if (typeFilter === 'ALL') return orders;
    return orders.filter((o) => o.type === typeFilter);
  }, [orders, typeFilter]);

  /* -----------------------------------------
   * LOADING STATE
   * ----------------------------------------*/
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 rounded-full bg-muted animate-pulse border"
            />
          ))}
        </div>

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
  if (orders.length === 0) {
    return <EmptyState />;
  }

  /* -----------------------------------------
   * DATA STATE
   * ----------------------------------------*/
  return (
    <div className="space-y-4">
      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(['ALL', 'DINE_IN', 'PACK', 'ORDER'] as FilterType[]).map((t) => {
          const active = typeFilter === t;
          const isAll = t === 'ALL';

          return (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={[
                'px-4 py-2 rounded-full text-sm font-semibold border transition-all',
                isAll
                  ? active
                    ? 'bg-black text-white border-neutral-700'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                  : [
                      TYPE_TINT_STYLES[t],
                      active
                        ? 'ring-2 ring-neutral-900/10 dark:ring-white/10'
                        : 'opacity-80 hover:opacity-100',
                    ].join(' '),
              ].join(' ')}
            >
              {ORDER_TYPE_LABEL[t]}
            </button>
          );
        })}
      </div>

      {visibleOrders.length === 0 ? (
        <div className="rounded-2xl border bg-muted p-6 text-center text-sm text-muted-foreground">
          No {ORDER_TYPE_LABEL[typeFilter]} orders found.
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence initial={false}>
            {visibleOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => onSelectOrder(order)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
