'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Order, OrderStatus } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, FileText, MapPin, Phone, Table, User } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

/* -----------------------------------------
 * STATUS CONFIG
 * ----------------------------------------*/

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    badge: string;
    next: OrderStatus[];
  }
> = {
  pending: {
    label: 'Pending',
    badge: 'bg-gray-300 text-gray-800',
    next: ['accepted', 'cancelled'],
  },
  accepted: {
    label: 'Accepted',
    badge: 'bg-purple-200 text-purple-800',
    next: ['preparing', 'cancelled'],
  },
  preparing: {
    label: 'Preparing',
    badge: 'bg-yellow-200 text-yellow-800',
    next: ['ready', 'cancelled'],
  },
  ready: {
    label: 'Ready',
    badge: 'bg-blue-200 text-blue-800',
    next: ['delivered'],
  },
  delivered: {
    label: 'Delivered',
    badge: 'bg-green-200 text-green-800',
    next: [],
  },
  cancelled: {
    label: 'Cancelled',
    badge: 'bg-red-200 text-red-800',
    next: [],
  },
};

/* -----------------------------------------
 * COMPONENT
 * ----------------------------------------*/

interface OrderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
}

export function OrderModal({
  order,
  isOpen,
  onClose,
  formatDate,
  formatCurrency,
}: OrderModalProps) {
  // 🧪 Dummy state
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const items = useMemo(() => order.order_item ?? [], [order.order_item]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + (i.quantity ?? 0), 0),
    [items]
  );

  const totalAmount = useMemo(() => {
    const n =
      typeof order.total_amount === 'string'
        ? Number(order.total_amount)
        : order.total_amount;

    return Number.isFinite(n) ? n : 0;
  }, [order.total_amount]);

  const computedTotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const addonsTotal =
        item.addons?.reduce((aSum, a) => aSum + a.price * a.qty, 0) ?? 0;

      const line = (item.price + addonsTotal) * item.quantity;
      return sum + line;
    }, 0);
  }, [items]);

  /* -----------------------------------------
   * STATUS HANDLER (DUMMY)
   * ----------------------------------------*/

  async function handleStatusChange(next: OrderStatus) {
    setStatusLoading(true);

    setTimeout(() => {
      setStatus(next);
      setStatusLoading(false);
      setStatusMenuOpen(false);
      toast.success(`Order marked as ${next} (dummy)`);
      onClose();
    }, 700);
  }

  useEffect(() => {
    if (statusMenuOpen) toast.info('Choose next status');
  }, [statusMenuOpen]);

  const statusConfig = STATUS_CONFIG[status];

  const showDelivery = order.type === 'ORDER';
  const showTable = order.type === 'DINE_IN' || order.type === 'PACK';

  /* -----------------------------------------
   * RENDER
   * ----------------------------------------*/

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[92%] max-h-[85vh] overflow-y-auto p-4 rounded-3xl bg-background border shadow-xl no-scrollbar">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        {/* STATUS */}
        <div className="flex justify-center mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.badge}`}
          >
            {statusConfig.label}
          </span>
        </div>

        <div className="space-y-4">
          {/* CUSTOMER */}
          <InfoRow icon={<User size={16} />} label="Customer" value={order.customer_name} />

          {order.customer_phone && (
            <InfoRow
              icon={<Phone size={16} />}
              label="Phone"
              value={order.customer_phone}
            />
          )}

          {showTable && order.table_number !== null && (
            <InfoRow
              icon={<Table size={16} />}
              label={order.type === 'PACK' ? 'Parcel Table' : 'Table'}
              value={`#${order.table_number}`}
            />
          )}

          {showDelivery && order.customer_address && (
            <InfoRow
              icon={<MapPin size={16} />}
              label="Address"
              value={order.customer_address}
            />
          )}

          <InfoRow
            icon={<Calendar size={16} />}
            label="Order Time"
            value={formatDate(order.created_at + 'Z')}
          />

          <InfoRow
            icon={<FileText size={16} />}
            label="Total Items"
            value={totalItems.toString()}
          />

          {/* ITEMS */}
          <div>
            <h3 className="font-semibold mb-2">Bill Items</h3>

            <div className="rounded-2xl border bg-muted p-3">
              <div className="grid grid-cols-12 text-[11px] text-muted-foreground pb-2 border-b">
                <div className="col-span-7">NAME</div>
                <div className="col-span-2 text-center">QTY</div>
                <div className="col-span-3 text-right">TOTAL</div>
              </div>

              <div className="pt-2 space-y-3">
                {items.map((item, idx) => {
                  const addons = item.addons ?? [];
                  const addonsTotal = addons.reduce(
                    (sum, a) => sum + a.price * a.qty,
                    0
                  );

                  const lineTotal =
                    (item.price + addonsTotal) * item.quantity;

                  return (
                    <div key={idx} className="space-y-2">
                      <div className="grid grid-cols-12 gap-2 items-start">
                        <div className="col-span-7 min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {item.name}
                          </p>
                        </div>

                        <div className="col-span-2 flex justify-center">
                          <span className="text-sm font-extrabold px-2 py-0.5 rounded-md border bg-background">
                            ×{item.quantity}
                          </span>
                        </div>

                        <div className="col-span-3 text-right">
                          <p className="text-sm font-semibold">
                            {formatCurrency(lineTotal)}
                          </p>
                        </div>
                      </div>

                      <div className="border-t" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* TOTAL */}
          <div className="pt-2 border-t space-y-1">
            <PriceRow
              label="Stored Total"
              value={formatCurrency(totalAmount)}
              highlight
            />

            {Math.abs(computedTotal - totalAmount) > 0.01 && (
              <PriceRow
                label="Computed Total"
                value={formatCurrency(computedTotal)}
              />
            )}
          </div>
        </div>

        {/* STATUS ACTION */}
        {statusConfig.next.length > 0 && (
          <div className="mt-6 flex justify-center relative">
            <AnimatePresence>
              {statusMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-3 w-[85%] rounded-2xl border bg-background shadow-lg"
                >
                  {statusConfig.next.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      className="w-full px-4 py-2 text-left hover:bg-muted capitalize"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="outline"
              className="w-[85%]"
              disabled={statusLoading}
              onClick={() => setStatusMenuOpen((p) => !p)}
            >
              {statusLoading ? 'Updating…' : 'Set Status'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* -----------------------------------------
 * HELPERS
 * ----------------------------------------*/

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-2 p-2 rounded-xl border bg-muted">
      <span className="text-muted-foreground">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium break-words">{value}</p>
      </div>
    </div>
  );
}

function PriceRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${
        highlight ? 'font-semibold text-lg text-green-500' : 'text-sm'
      }`}
    >
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
