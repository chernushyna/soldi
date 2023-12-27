import express from "express";
import {PrismaClient} from '@prisma/client';
import {isAdminUser} from "../../middleware/authentication.js";

const prisma = new PrismaClient();
const router = express.Router();

router.put('/products/:id', isAdminUser, async (req, res) => {
    const {id} = req.params;
    const {name, description, price, stockQuantity, category} = req.body;

    try {
        const updatedProduct = await prisma.products.update({
            where: {
                id: id
            },
            data: {
                name,
                description,
                price,
                stockQuantity,
                category,
            },
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.post('/products', isAdminUser, async (req, res) => {
    try {
        const {name, description, price, stockQuantity, category} = req.body;

        const newProduct = await prisma.products.create({
            data: {
                name,
                description,
                price,
                stockQuantity,
                category,
            },
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await prisma.products.findMany({
            include: {
                ProductSizes: {
                    select: {
                        id: true,
                        size: true,
                    },
                }
            }
        });

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.delete('/products/:id', isAdminUser, async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.productImage.deleteMany({
            where: {
                productId: id,
            },
        });

        await prisma.productSizes.deleteMany({
            where: {
                productId: id,
            },
        });

        const deletedProduct = await prisma.products.delete({
            where: {
                id: id,
            },
        });

        res.status(204).json({ deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;