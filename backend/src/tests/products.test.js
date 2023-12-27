import request from 'supertest';
import express from 'express';
import router from '../routes/products.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use('/', router);

describe('Stock Routes', () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('GET /products should return a list of products', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });

    it('GET /product/:id should return a specific product', async () => {
        const mockProductId = 'bc58688c-3380-4e76-831e-f05f2b4aa3ad';
        const response = await request(app).get(`/product/${mockProductId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({ id: mockProductId }));
    });

    it('GET /products/uniqueSizes should return unique sizes', async () => {
        const response = await request(app).get('/products/uniqueSizes');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('uniqueSize');
        expect(response.body.uniqueSize).toEqual(expect.any(Array));
    });
});
