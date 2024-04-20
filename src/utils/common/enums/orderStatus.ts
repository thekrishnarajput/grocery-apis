export const OrderStatus = {
    // Order status
    orderPending: 1 as const,
    orderApproved: 2 as const,
    orderProcessing: 3 as const,
    orderDelivered: 4 as const,
    orderCancelled: 5 as const,
    orderReturned: 6 as const,
} as const;