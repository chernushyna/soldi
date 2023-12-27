import express from 'express';
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
const prisma = new PrismaClient();
const router = express.Router();

dotenv.config();
/******************
 ***AUTH ROUTES***
 ******************/

router.post('/register', async (req, res) => {
    try {
        const { email, username, password, firstName, lastName } = req.body;

        const existingUser = await prisma.users.findFirst({
            where: {
                OR: [{ email: email }, { username: username }],
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                username,
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await prisma.users.findFirstOrThrow({
            where: {
                OR: [{ email: identifier }, { username: identifier }],
            },
        });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const userDetails = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        req.user = userDetails;

        const token = jwt.sign(userDetails, process.env.JWT_SECRET_KEY, {expiresIn : '24h'});

        res.status(200).json({access_token: token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const user = await prisma.users.findFirst({
            where: {
                OR: [{ email: identifier }, { username: identifier }],
            },
        });
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/logout', (req, res) => {
    const expiredToken = jwt.sign({}, process.env.JWT_SECRET_KEY, { expiresIn: '0s' });
    res.status(200).json({ message: 'Logout successful', token: expiredToken });
});


export default router;
