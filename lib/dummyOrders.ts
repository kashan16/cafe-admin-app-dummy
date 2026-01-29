// lib/dummyOrders.ts
import { Order, OrderStatus, OrderType } from '@/types';

export const dummyOrders: Order[] = [
  {
    id: 'order-1',
    customer_name: 'John Doe',
    status: 'preparing' as OrderStatus,
    type: 'DINE_IN' as OrderType,
    table_number: 4,
    customer_phone: null,
    customer_address: null,
    total_amount: 560,
    created_at: new Date().toISOString(),
    notes: null,
    order_item: [
      {
        item_id: 'item-1',
        name: 'Paneer Butter Masala',
        quantity: 2,
        price: 160
      },
      {
        item_id: 'item-2',
        name: 'Butter Naan',
        quantity: 4,
        price: 220
      },
      {
        item_id: 'item-3',
        name: 'Cold Drink',
        quantity: 1,
        price: 80
      },
    ],
    updated_at: ''
  },
  {
    id: 'order-2',
    customer_name: 'Aisha Khan',
    status: 'pending' as OrderStatus,
    type: 'ORDER' as OrderType,
    table_number: null,
    customer_phone: '9876543210',
    customer_address: 'Civil Lines, Delhi',
    total_amount: 420,
    created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    notes: 'Less spicy',
    order_item: [
      {
        item_id: 'item-4',
        name: 'Veg Biryani',
        quantity: 1,
        price: 220
      },
      {
        item_id: 'item-5',
        name: 'Raita',
        quantity: 1,
        price: 45
      },
    ],
    updated_at: ''
  },
];
