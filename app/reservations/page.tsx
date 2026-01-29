'use client';

import { useState } from 'react';

import PaginationControls from '@/components/dashboard/PaginationControls';
import { ReservationModal } from '@/components/modal/ReservationModal';
import { AdminNavbar } from '@/components/Navbar';
import Header from '@/components/reservations/Header';
import ReservationsGrid from '@/components/reservations/ReservationsGrid';
import ReservationStatsSidebar from '@/components/reservations/ReservationsStatsSidebar';
import { Reservation } from '@/types';

export default function ReservationsPage() {
    const formatDate = (value: string) =>
        new Date(value).toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    const [selected, setSelected] = useState<Reservation | null>(null);
    return (
        <div className="min-h-screen">
            <div className="sticky top-0 z-50">
                <AdminNavbar />
            </div>
            <main className="pt-20 pb-12 flex flex-col items-center">
                <div className="w-[90vw] max-w-7xl">
                    <Header />
                </div>
                <div className="w-[90vw] max-w-7xl grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                    <ReservationStatsSidebar/>
                    <section className="order-1 lg:order-2 w-full">
                        <ReservationsGrid onSelect={setSelected} />
                        <PaginationControls/>
                    </section>
                </div>
                {selected && (
                    <ReservationModal
                    reservation={selected}
                    isOpen
                    onClose={() => setSelected(null)}
                    formatDate={formatDate}
                    />
                )}
            </main>
        </div>
    );
}
