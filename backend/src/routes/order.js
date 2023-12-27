import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

/******************
 ***ORDERS ROUTES***
 ******************/

// Create a new order
router.post('/orders', async (req, res) => {
    const {
        userId,
        firstName,
        lastName,
        address,
        phone,
        email,
        total,
        items,
    } = req.body;
    
    try {
        const newOrder = await prisma.orders.create({
            data: {
                userId,
                firstName,
                lastName,
                address,
                phone,
                email,
                total,
                items: {
                    create: items,
                },
            },
            include: {
                items: true,
            },
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await prisma.orders.findMany({
            include: {
                items: true,
            },
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/orders/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await prisma.orders.findMany({
            include: {
                items: true,
            },
            where: {
                userId: userId
            }
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a specific order by ID
router.get('/orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await prisma.orders.findUnique({
            where: { id: orderId },
            include: {
                items: true,
            },
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update an existing order by ID
router.put('/orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const {
            userId,
            firstName,
            lastName,
            address,
            phone,
            email,
            total,
            status,
            items, // Array of updated OrderItems
        } = req.body;

        const updatedOrder = await prisma.orders.update({
            where: { id: orderId },
            data: {
                userId,
                firstName,
                lastName,
                address,
                phone,
                email,
                total,
                status,
                items: {
                    deleteMany: {}, // Optionally delete existing items
                    create: items,
                },
            },
            include: {
                items: true,
            },
        });

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete an order by ID
router.delete('/orders/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        await prisma.orders.delete({
            where: { id: orderId },
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
