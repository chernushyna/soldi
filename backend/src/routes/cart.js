import express from 'express';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

/******************
 *** CART ROUTES ***
 ******************/

router.post('/cart', async (req, res) => {
    try {
        const {productId, userId, quantity, sizeId} = req.body;

        const searchCartItem = await prisma.cartItems.findFirst({
            where: {
                productId: productId,
                userId: userId,
                sizeId: {
                    equals: sizeId,
                },
            },
        });

        if (searchCartItem) {
            const updatedQuantity = searchCartItem.quantity + quantity;

            const updateCartItem = await prisma.cartItems.update({
                where: {
                    id: searchCartItem.id,
                },
                data: {
                    quantity: updatedQuantity,
                },
            });

            res.status(201).json(updateCartItem);
        } else {
            const newCartItem = await prisma.cartItems.create({
                data: {
                    quantity: quantity,
                    product: {
                        connect: {
                            id: productId,
                        },
                    },
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                    size: {
                        connect: {
                            id: sizeId,
                        }
                    }
                },
            });

            res.status(201).json(newCartItem);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/cart', async (req, res) => {
    try {
        const userId = req.query.userId;

        const allCartItems = await prisma.cartItems.findMany({
            where: {
                userId: userId
            },
            include: {
                product: {
                    select: {
                        name: true,
                        price: true,
                        ProductImage: {
                            select: {
                                id: true,
                                data: true,
                            }
                        }
                    }
                },
                size: {
                    select: {
                        size: true,
                    }
                }
            }
        });

        const cartItems = allCartItems.map(cartItem => {
            const productImages = cartItem.product.ProductImage.map(image => ({
                id: image.id,
                data: image.data.toString('base64'),
            }));

            return {
                ...cartItem,
                product: {
                    ...cartItem.product,
                    ProductImage: productImages,
                },
            };
        });

        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/cart/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const cartItem = await prisma.cartItems.findUnique({
            where: {id: itemId},
        });

        if (!cartItem) {
            return res.status(404).json({error: 'Cart item not found'});
        }

        res.status(200).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.put('/cart/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const { quantity } = req.body;

        const updatedCartItem = await prisma.cartItems.update({
            where: {
                id: itemId
            },
            data: {
                quantity
            },
        });

        res.status(200).json(updatedCartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.delete('/cart/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;

        await prisma.cartItems.delete({
            where: {
                id: itemId
            },
        });

        res.status(200).json({message: 'Cart item deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.post('/cart/delete', async (req, res) => {
    try {
        const { itemIds } = req.body;

        if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
            return res.status(400).json({ error: 'Invalid itemIds provided' });
        }

        await prisma.cartItems.deleteMany({
            where: {
                id: {
                    in: itemIds,
                },
            },
        });

        res.status(200).json({ message: 'Cart items deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
