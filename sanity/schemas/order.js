

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
            }
        },
        {
            name: 'userName',
            title: 'UserName',
            type: 'string',
        },
        {
            name: 'itemsPrice',
            title: 'ItemsPrice',
            type: 'number',
        },
        {
            name: 'shippingPrice',
            title: 'ShippingPrice',
            type: 'number',
        },
        {
            name: 'taxPrice',
            title: 'TaxPrice',
            type: 'number',
        },
        {
            name: 'totalPrice',
            title: 'TotalPrice',
            type: 'number',
        },
        {
            name: 'paymentMethod',
            title: 'PaymentMethod',
            type: 'string',
        },
        {
            name: 'shippingAddress',
            title: 'ShippingAddress',
            type: 'shippingAddress',
        },
        {
            name: 'paymentResult',
            title: 'PaymentResult',
            type: 'paymentResult',
        },
        {
            name: 'orderItems',
            title: 'OrderItems',
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