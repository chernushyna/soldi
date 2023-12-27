import express from 'express';
import {PrismaClient} from '@prisma/client';
import {isAdminUser} from "../middleware/authentication.js";

const prisma = new PrismaClient();
const router = express.Router();

/******************
 ***STOCK ROUTES***
 ******************/

router.get('/products', async (req, res) => {
    try {
        const {size, orderBy} = req.query;
        let whereCondition = {};

        if (size && size.toLowerCase() !== 'all') {
            whereCondition = {
                ProductSizes: {
                    some: {
                        size: size,
                    },
                },
            };
        }

        const allProducts = await prisma.products.findMany({
            include: {
                ProductImage: {
                    select: {
                        id: true,
                        data: true,
                    },
                },
            },
            orderBy: [{price: orderBy ?? "desc"}],
            where: whereCondition,
        });

        const products = allProducts.map((product) => ({
            ...product,
            ProductImage: product.ProductImage.map((image) => ({
                id: image.id,
                data: image.data.toString('base64'),
            })),
        }));

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/new-products', async (req, res) => {
    try {
        const {size, orderBy} = req.query;

        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);

        let whereCondition = {
            createdAt: {
                gte: oneDayAgo.toISOString(),
            },
        };

        if (size && size.toLowerCase() !== 'all') {
            whereCondition = {
                AND: [
                    whereCondition,
                    {
                        ProductSizes: {
                            some: {
                                size: size,
                            },
                        },
                    },
                ],
            };
        }

        const allProducts = await prisma.products.findMany({
            include: {
                ProductImage: {
                    select: {
                        id: true,
                        data: true,
                    },
                },
            },
            orderBy: [{price: orderBy ?? 'desc'}],
            where: whereCondition,
        });

        const products = allProducts.map((product) => ({
            ...product,
            ProductImage: product.ProductImage.map((image) => ({
                id: image.id,
                data: image.data.toString('base64'),
            })),
        }));

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});


router.get('/product/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const uniqueProduct = await prisma.products.findFirst({
            where: {
                id: id
            },
            include: {
                ProductImage: true,
                ProductSizes: true
            }
        });

        if (!uniqueProduct) {
            return res.status(404).json({error: 'Product not found'});
        }

        const product = {
            ...uniqueProduct,
            ProductImage: uniqueProduct.ProductImage.map(image => ({
                id: image.id,
                data: image.data.toString('base64'),
            })),
        };

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/products/uniqueSizes', async (req, res) => {
    try {
        const sizes = await prisma.productSizes.findMany({
            distinct: ['size'],
        });

        const uniqueSize = sizes.map((size) => ({
            id: size.id,
            size: size.size,
        }));

        res.status(200).json({uniqueSize});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;
