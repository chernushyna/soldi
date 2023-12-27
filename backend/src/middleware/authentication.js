import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyToken(req, res, next) {
    const access_token  = req.cookies.access_token;
    if (!access_token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        req.user = jwt.verify(access_token, process.env.JWT_SECRET_KEY);
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Access denied. Invalid token.' });
    }
}

export function isAdminUser(req, res, next) {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        req.user = jwt.verify(access_token, process.env.JWT_SECRET_KEY);
        const isAdmin = req.user.role === 'ADMIN';
        if (isAdmin) {
            next();
        } else {
            res.status(400).json({ message: 'Access denied. Insufficient privileges.' });
        }
    } catch (ex) {
        res.status(400).json({ message: 'Access denied. Invalid token.' });
    }
}
