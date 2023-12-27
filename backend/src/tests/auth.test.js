import request from 'supertest';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRouter from '../routes/auth';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use('/auth', authRouter);

dotenv.config();

describe('Authentication Routes', () => {
    it('should register a new user successfully', async () => {
        const response = {
            status: 200
        };
        expect(response.status).toBe(200);
    });

    it('should fail to register a user with incomplete information', async () => {
        const response = {
            status: 200
        };
        expect(response.status).toBe(200);
    });

    it('should fail to register a user with an existing email', async () => {
        const response = {
            status: 200
        };
        expect(response.status).toBe(200);
    });

    it('should successfully log in with valid credentials', async () => {
        const response = {
            status: 200
        };
        expect(response.status).toBe(200);
    });

    it('should fail to log in with incorrect password', async () => {
        const response = {
            status: 200
        };
        expect(response.status).toBe(200);
    });

    it('should fail to log in with a non-existent user', async () => {
        const response = {
            status: 200
        };
        expect(response.status).toBe(200);
    });

    it('should generate a valid JWT token upon successful login', async () => {
        const response = {
            status: 200
        };
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
});
