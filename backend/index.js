import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './src/routes/auth.js';
import productsRouter from './src/routes/products.js';
import cartRouter from './src/routes/cart.js';
import orderRouter from './src/routes/order.js';
import utilityRouter from './src/routes/utility.js';
import authAdminRouter from './src/routes/admin/auth.js';
import ordersAdminRouter from './src/routes/admin/orders.js';
import overviewAdminRouter from './src/routes/admin/overview.js';
import productsAdminRouter from './src/routes/admin/products.js';
import usersAdminRouter from './src/routes/admin/users.js';
import utilityAdminRouter from './src/routes/admin/utility.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
);

app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', productsRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);


app.use('/admin', authAdminRouter);
app.use('/admin', ordersAdminRouter);
app.use('/admin', productsAdminRouter);
app.use('/admin', usersAdminRouter);
app.use('/admin', overviewAdminRouter);
app.use('/admin', utilityAdminRouter);

app.use('/utility', utilityRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running. http://localhost:${process.env.SERVER_PORT}`);
});
