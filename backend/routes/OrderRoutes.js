const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
    const userEmail = req.query.user;

    try {
        const orderItems = await Order.find({ userEmail });

        // if (orderItems.length === 0) {
        //     return res.status(404).json({ message: 'Order not found' });
        // }
        console.log('OrderRoutes');
        console.log(orderItems);
        console.log(orderItems.items);
        const formattedOrderItems = orderItems.map((item) => ({
            id: item.items[0].productId,
            name: item.items[0].name,
            price: item.items[0].price,
            quantity: item.items[0].quantity,
            shippingCost: item.shippingCost,
            total: item.total,
            orderDateTime: item.orderDateTime,
            status: item.status,
        }));

        res.json(formattedOrderItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/updatestatus', async (req, res) => {
    const { id, status } = req.body;

    try {
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;