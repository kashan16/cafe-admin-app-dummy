export type OrderType = 'DINE_IN' | 'PACK' | 'ORDER';

export type OrderStatus =
    | 'pending'
    | 'accepted'
    | 'preparing'
    | 'ready'
    | 'delivered'
    | 'cancelled';

export interface AdminUser {
    id: string;
    username: string;
    created_at: string;
    updated_at: string;
}

export interface AdminSession {
    id: string;
    admin_id: string;
    token: string;
    refresh_token: string | null;
    user_agent: string | null;
    created_at: string;
    last_active_at: string;
    expires_at: string;
    updated_at: string;
}

export interface OrderItemAddon {
    id: string;
    label: string;
    price: number;
    qty: number;
}

export interface OrderItem {
    item_id: string;
    name?: string;
    quantity: number;
    price: number;
    variant_id?: string;
    variant_label?: string;
    notes?: string;
    addons?: OrderItemAddon[];
}

export interface Order {
    id: string;

    type: OrderType;

    table_number: number | null;

    customer_name: string;
    customer_phone: string | null;
    customer_address: string | null;

    order_item: OrderItem[];

    total_amount: number;

    notes: string | null;

    status: OrderStatus;

    created_at: string;
    updated_at: string;
}

export type AdminOrderSummary = Pick<
    Order,
    | 'id'
    | 'type'
    | 'table_number'
    | 'customer_name'
    | 'customer_phone'
    | 'total_amount'
    | 'status'
    | 'created_at'
>;

export type AdminOrderDetail = Order;

export interface OrderStats {
    status: OrderStatus;
    order_count: number;
    total_revenue: number;
}

export interface DailyRevenue {
    date: string;           // YYYY-MM-DD
    total_orders: number;
    revenue: number;
}

export interface MenuItem {
    id: string;
    name: string;
    price: number;

    category: string;
    type: FoodType;

    image?: string;
    available: boolean;

    options?: Variant[];
    addons?: Addon[];
}

export type FoodType = 'Veg' | 'Non-Veg';

export type Variant = {
    id: string;
    label: string;
    price: number;
    default?: boolean;
};

export type Addon = {
    id: string;
    label: string;
    price: number;
    parentItemId?: string;
};



