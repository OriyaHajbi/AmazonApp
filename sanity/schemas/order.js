

export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            title: 'User',
            name: 'user',
            type: 'reference',
            to: [{ type: 'user' }],
            options: {
                disableNew: true,
            },
        },
        {
            name: 'userName',
            title: 'UserName',
            type: 'string',
        },
        {
            name: 'itemsPrice',
            title: 'itemsPrice',
            type: 'number',
        },
        {
            name: 'shippingPrice',
            title: 'shippingPrice',
            type: 'number',
        },
        {
            name: 'taxPrice',
            title: 'taxPrice',
            type: 'number',
        },
        {
            name: 'totalPrice',
            title: 'totalPrice',
            type: 'number',
        },
        {
            name: 'paymentMethod',
            title: 'paymentMethod',
            type: 'string',
        },
        {
            name: 'shippingAddress',
            title: 'shippingAddress',
            type: 'shippingAddress',
        },
        {
            name: 'paymentResult',
            title: 'paymentResult',
            type: 'paymentResult',
        },
        {
            name: 'orderItems',
            title: 'order Items',
            type: 'array',
            of: [
                {
                    title: 'Order Item',
                    type: 'orderItem'
                },
            ],
        },
        {
            name: 'isPaid',
            title: 'IsPaid',
            type: 'boolean',
        },
        {
            name: 'paidAt',
            title: 'Paid Date',
            type: 'datetime',
        },
        {
            name: 'isDelivered',
            title: 'IsDelivered',
            type: 'boolean',
        },
        {
            name: 'deliveredAt',
            title: 'DeliveredAt',
            type: 'datetime',
        },
        {
            name: 'createdAt',
            title: 'CreatedAt',
            type: 'datetime',
        },
    ],
};