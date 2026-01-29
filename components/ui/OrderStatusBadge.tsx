import { OrderStatus } from "@/types";
import clsx from "clsx";

const STATUS_STYLES: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-blue-100 text-blue-800",
    preparing: "bg-purple-100 text-purple-800",
    ready: "bg-green-100 text-green-800",
    delivered: "bg-gray-200 text-gray-700",
    cancelled: "bg-red-100 text-red-800",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
    return (
        <span
        className={clsx(
            "px-2 py-1 rounded text-xs font-medium capitalize",
            STATUS_STYLES[status]
        )}>
            {status}
        </span>
    );
}
