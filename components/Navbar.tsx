// components/AdminNavbar.tsx
'use client';

import { RefreshCw, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { EnableAdminPushIconButton } from './EnableAdminPush';
import { MenuAvailabilitySheet } from './modal/MenuAvailabilitySheet';

export function AdminNavbar() {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  // 🧪 Dummy refresh
  const handleRefresh = () => {
    toast.info('Dashboard refreshed (dummy)');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-sm border-b border-white/20 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div className="flex items-center space-x-3">
              {/* <Image
                src="/logo.png"
                alt="Logo"
                width={90}
                height={50}
                className="object-contain"
                priority
              /> */}
              <h1>LOGO</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Refresh */}
              <button
                onClick={handleRefresh}
                className="text-gray-900 hover:text-white hover:bg-white/10 transition-all duration-200 p-1.5 rounded-lg border border-white/20"
                title="Refresh dashboard data"
              >
                <RefreshCw className="h-4 w-4" />
              </button>

              {/* Menu Availability */}
              <button
                onClick={() => setIsMenuModalOpen(true)}
                className="text-gray-900 hover:text-white hover:bg-white/10 transition-all duration-200 p-1.5 rounded-lg border border-white/20"
                title="Menu availability"
              >
                <UtensilsCrossed className="h-4 w-4" />
              </button>

              {/* Dummy Admin Identity */}
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm text-gray-900 font-semibold tracking-wide">
                  Admin User
                </span>
                <span className="text-xs text-gray-900 font-medium bg-white/10 px-2 py-0.5 rounded-full">
                  Administrator
                </span>
              </div>

              {/* Dummy Push Toggle */}
              <EnableAdminPushIconButton adminId="dummy-admin-id" />

              {/* ❌ Logout removed intentionally */}
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ Menu Availability Sheet (Dummy) */}
      <MenuAvailabilitySheet
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </>
  );
}
