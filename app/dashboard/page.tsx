'use client';

import { useState } from 'react';

import Header from '@/components/dashboard/Header';
import PaginationControls from '@/components/dashboard/PaginationControls';
import StatsSidebar from '@/components/dashboard/StatsSidebar';
import { AnalyticsModal } from '@/components/modal/AnalyticsModal';
import { AdminNavbar } from '@/components/Navbar';

import OrdersGrid from '@/components/dashboard/OrdersGrid';
import { OrderModal } from '@/components/modal/OrderModel';
import { Order } from '@/types';

export default function AdminDashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  const formatDate = (value: string) =>
    new Date(value).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      {/* NAVBAR */}
      <div className="sticky top-0 z-50">
        <AdminNavbar />
      </div>

      {/* MAIN */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* HEADER */}
          <div className="w-[90vw] max-w-7xl">
            <Header />
          </div>

          {/* CONTENT GRID */}
          <div
            className="
              w-[90vw]
              max-w-7xl
              grid
              grid-cols-1
              lg:grid-cols-[320px_1fr]
              gap-6
            "
          >
            {/* SIDEBAR */}
            <StatsSidebar />

            {/* ANALYTICS MODAL */}
            <AnalyticsModal
              open={analyticsOpen}
              onClose={() => setAnalyticsOpen(false)}
            />

            {/* ORDERS */}
            <section className="order-1 lg:order-2 w-full">
              <OrdersGrid onSelectOrder={setSelectedOrder}/>
              <PaginationControls />
            </section>
          </div>

          {/* ORDER MODAL */}
          {selectedOrder && (
            <OrderModal
              order={selectedOrder}
              isOpen={true}
              onClose={() => setSelectedOrder(null)}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
            />
          )}
        </div>
      </main>
    </div>
  );
}
