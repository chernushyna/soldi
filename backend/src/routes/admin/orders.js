import { isAdminUser } from "../../middleware/authentication.js";
import { PrismaClient } from '@prisma/client';
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get('/orders', isAdminUser, async (req, res) => {
    try {
        const orders = await prisma.orders.findMany();

        res.status(200).json({orders: orders});
    } catch (error){
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }

});

router.put('/order/:id', isAdminUser, async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const updatedOrder = await prisma.orders.update({
            where: {
                id: orderId
            },
            data: {
                status: status
            },
        });

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;