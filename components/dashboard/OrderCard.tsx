'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Order, OrderStatus, OrderType } from '@/types';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMemo, useState } from 'react';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

/* -----------------------------------------
 * STYLES
 * ----------------------------------------*/

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-gray-200 text-gray-700',
  accepted: 'bg-purple-200 text-purple-800',
  preparing: 'bg-yellow-200 text-yellow-800',
  ready: 'bg-blue-200 text-blue-800',
  delivered: 'bg-green-200 text-green-800',
  cancelled: 'bg-red-200 text-red-800',
};

const TYPE_TINT_STYLES: Record<OrderType, string> = {
  DINE_IN: 'bg-red-100 border-red-200',
  PACK: 'bg-yellow-100 border-yellow-200',
  ORDER: 'bg-green-100 border-green-200',
};

const TYPE_BADGE: Record<OrderType, { label: string; className: string }> = {
  DINE_IN: {
    label: 'TABLE',
    className: 'bg-red-500/15 text-red-700 border-red-500/20',
  },
  PACK: {
    label: 'PACK',
    className: 'bg-yellow-500/15 text-yellow-800 border-yellow-500/20',
  },
  ORDER: {
    label: 'DELIVERY',
    className: 'bg-green-500/15 text-green-800 border-green-500/20',
  },
};

/* -----------------------------------------
 * COMPONENT
 * ----------------------------------------*/

export default function OrderCard({ order, onClick }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);

  const items = useMemo(() => order.order_item ?? [], [order.order_item]);

  const totalItems = useMemo(
    () => items.reduce((s, i) => s + (i.quantity ?? 0), 0),
    [items]
  );

  const amount = Number(order.total_amount) || 0;

  const visibleItems = expanded ? items : items.slice(0, 2);
  const remainingCount = Math.max(0, items.length - 2);

  const timeText = new Date(order.created_at + 'Z').toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  });

  const contextText =
    order.type === 'DINE_IN' || order.type === 'PACK'
      ? order.table_number !== null
        ? `#${order.table_number}`
        : '—'
      : order.customer_phone ??
        (order.customer_address ? 'Address added' : '—');

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={[
        'cursor-pointer rounded-xl border p-4 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]',
        TYPE_TINT_STYLES[order.type],
      ].join(' ')}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="text-lg font-semibold truncate">
              {order.customer_name}
            </h3>

            <Badge
              variant="outline"
              className={[
                'text-[10px] font-extrabold px-2 py-0.5 rounded-full',
                TYPE_BADGE[order.type].className,
              ].join(' ')}
            >
              {TYPE_BADGE[order.type].label}
              {(order.type === 'DINE_IN' || order.type === 'PACK') &&
                order.table_number !== null &&
                ` • ${order.table_number}`}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground mt-1 truncate">
            {order.type} <span className="opacity-80">•</span> {contextText}{' '}
            <span className="opacity-80">•</span> {timeText}
          </p>
        </div>

        <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
          ₹{amount}
        </Badge>
      </div>

      {/* STATUS + COUNT */}
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`px-2 py-0.5 text-[10px] rounded-md font-semibold capitalize ${STATUS_STYLES[order.status]}`}
        >
          {order.status}
        </span>

        <span className="bg-muted/70 px-2 py-0.5 rounded text-xs font-semibold">
          {totalItems} items
        </span>
      </div>

      {/* ITEMS */}
      <div className="mt-3 space-y-1">
        {visibleItems.map((item, idx) => (
          <div key={idx} className="flex justify-between gap-2">
            <p className="truncate text-sm font-semibold">
              {item.name ?? item.item_id}
            </p>
            <span className="px-2 py-0.5 text-[11px] font-extrabold rounded-md border bg-background">
              ×{item.quantity}
            </span>
          </div>
        ))}

        {items.length > 2 && (
          <div className="pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((v) => !v);
              }}
              className="h-8 px-2 text-xs text-muted-foreground"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  See less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  See {remainingCount} more
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </motion.article>
  );
}
