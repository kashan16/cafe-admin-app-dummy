import { Reservation } from "@/types";

export const dummyReservations: Reservation[] = [
    {
        id: 'res-1',
        name: 'Rahul Sharma',
        phone: '9876543210',
        reason: 'Birthday Dinner',
        date: '2026-02-01',
        arrival_time: '19:30',
        slot: '90m',
        status: 'pending',
        created_at: new Date().toISOString(),
    },
    {
        id: 'res-2',
        name: 'Ayesha Khan',
        phone: '9123456789',
        reason: 'Business Meeting',
        date: '2026-02-01',
        arrival_time: '13:00',
        slot: '60m',
        status: 'reserved',
        created_at: new Date().toISOString(),
    },
    {
        id: 'res-3',
        name: 'Vikram Patel',
        phone: '9988776655',
        reason: 'Family Lunch',
        date: '2026-02-02',
        arrival_time: '12:30',
        slot: '120m+',
        status: 'cancelled',
        created_at: new Date().toISOString(),
    },
];
