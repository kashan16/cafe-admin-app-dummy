'use client';

import { Badge } from '@/components/ui/badge';
import { Reservation, ReservationStatus } from '@/types';
import { motion } from 'framer-motion';
import { Clock, Phone } from 'lucide-react';

interface Props {
  reservation: Reservation;
  onClick: () => void;
}

const STATUS_STYLES: Record<ReservationStatus, string> = {
  pending: 'bg-gray-200 text-gray-800',
  reserved: 'bg-green-200 text-green-800',
  cancelled: 'bg-red-200 text-red-800',
};

export default function ReservationCard({ reservation, onClick }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="cursor-pointer rounded-xl border p-4 shadow-sm hover:shadow-md hover:scale-[1.02] bg-card"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold truncate">
            {reservation.name}
          </h3>

          <p className="text-xs text-muted-foreground mt-1 truncate">
            {reservation.reason}
          </p>
        </div>

        <Badge className={`text-xs ${STATUS_STYLES[reservation.status]}`}>
          {reservation.status}
        </Badge>
      </div>

      {/* META */}
      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          {reservation.phone}
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {reservation.date} • {reservation.arrival_time} • {reservation.slot}
        </div>
      </div>
    </motion.article>
  );
}
