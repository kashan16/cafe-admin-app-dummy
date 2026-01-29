'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Reservation, ReservationStatus } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Phone,
  User,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

/* -----------------------------------------
 * STATUS CONFIG (reservation)
 * ----------------------------------------*/

const STATUS_CONFIG: Record<
  ReservationStatus,
  {
    label: string;
    badge: string;
    next: ReservationStatus[];
  }
> = {
  pending: {
    label: 'Pending',
    badge: 'bg-gray-300 text-gray-800',
    next: ['reserved', 'cancelled'],
  },
  reserved: {
    label: 'Reserved',
    badge: 'bg-green-200 text-green-800',
    next: ['cancelled'],
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

interface ReservationModalProps {
  reservation: Reservation;
  isOpen: boolean;
  onClose: () => void;
  formatDate?: (date: string) => string;
}

export function ReservationModal({
  reservation,
  isOpen,
  onClose,
  formatDate,
}: ReservationModalProps) {
  const [status, setStatus] = useState<ReservationStatus>(reservation.status);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  async function handleStatusChange(next: ReservationStatus) {
    setStatusLoading(true);

    setTimeout(() => {
      setStatus(next);
      setStatusLoading(false);
      setStatusMenuOpen(false);
      toast.success(`Reservation marked as ${next} (dummy)`);
      onClose();
    }, 700);
  }

  useEffect(() => {
    if (statusMenuOpen) toast.info('Choose next status');
  }, [statusMenuOpen]);

  const statusConfig = STATUS_CONFIG[status];

  const dateText = formatDate
    ? formatDate(reservation.date)
    : new Date(reservation.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

  /* -----------------------------------------
   * RENDER
   * ----------------------------------------*/

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[92%] max-h-[85vh] overflow-y-auto p-4 rounded-3xl bg-background border shadow-xl no-scrollbar">
        <DialogHeader>
          <DialogTitle>Reservation Details</DialogTitle>
        </DialogHeader>

        {/* STATUS BADGE */}
        <div className="flex justify-center mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.badge}`}
          >
            {statusConfig.label}
          </span>
        </div>

        <div className="space-y-4">
          {/* NAME */}
          <InfoRow
            icon={<User size={16} />}
            label="Name"
            value={reservation.name}
          />

          {/* PHONE */}
          <InfoRow
            icon={<Phone size={16} />}
            label="Phone"
            value={reservation.phone}
          />

          {/* REASON */}
          <InfoRow
            icon={<Users size={16} />}
            label="Reason"
            value={reservation.reason}
          />

          {/* DATE */}
          <InfoRow
            icon={<Calendar size={16} />}
            label="Date"
            value={dateText}
          />

          {/* ARRIVAL TIME */}
          <InfoRow
            icon={<Clock size={16} />}
            label="Arrival Time"
            value={reservation.arrival_time}
          />

          {/* SLOT */}
          <InfoRow
            icon={<Clock size={16} />}
            label="Time Slot"
            value={reservation.slot}
          />
        </div>

        {/* STATUS ACTION*/}
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
