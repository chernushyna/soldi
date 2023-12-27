import bcrypt from 'bcrypt';
import express from "express";
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import {isAdminUser} from "../../middleware/authentication.js";
const prisma = new PrismaClient();
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const admin = await prisma.users.findFirst({
            where: {
                role: 'ADMIN',
                OR: [{ email: identifier }, { username: identifier }],
            },
        });
        if(!admin){
            return res.status(400).json({ error: 'User does not exist' });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const userDetails = {
            id: admin.id,
            email: admin.email,
            role: admin.role,
        };

        req.user = userDetails;

        const token = jwt.sign(userDetails, process.env.JWT_SECRET_KEY, {expiresIn : '1h'});

        res.status(200).json({ access_token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
