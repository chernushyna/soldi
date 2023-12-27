import { isAdminUser } from "../../middleware/authentication.js";
import { PrismaClient } from '@prisma/client';
import express from "express";
import multer from 'multer'

const prisma = new PrismaClient();
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/upload/:productId', isAdminUser, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const { buffer } = req.file;

        const { productId } = req.params;

        const image = await prisma.productImage.create({
            data: {
                data: buffer,
                product: { connect: { id: productId } },
            },
        });

        res.status(201).json({ id: image.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/image/:id', isAdminUser, async (req, res) => {
    const { id } = req.params;
    try {
        const image = await prisma.productImage.findUnique({
            where:{
                id: id
            }
        });

        if (!image) {
            res.status(404).json({ error: 'Image not found' });
        } else {
            res.contentType('image/jpeg');
            res.status(200).send(image.data);
        }
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;