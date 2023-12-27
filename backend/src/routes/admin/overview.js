import { isAdminUser } from "../../middleware/authentication.js";
import { PrismaClient } from '@prisma/client';
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/overview', isAdminUser, async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const orderCount = await prisma.orders.count({
            where: {
                createdAt: {
                    lt: oneWeekAgo,
                }
            }
        });

        const userCount = await prisma.users.count({
            where: {
                createdAt: {
                    lt: oneWeekAgo
                }
            }
        });

        const productCount = await prisma.products.count({
            where:{
                createdAt:{
                    lt: oneWeekAgo
                }
            }
        });

        const overviewStatistics = [
            { label: 'Order Count', value: orderCount, to: '/admin/orders' },
            { label: 'User Count', value: userCount, to: '/admin/users' },
            { label: 'Product Count', value: productCount, to: '/admin/products' },
        ];

        res.status(200).json({ overviewStatistics });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;