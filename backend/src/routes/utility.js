import express from 'express';
import { verifyToken } from "../middleware/authentication.js";
const router = express.Router();
/******************
 *** UTILITIES  ***
 ******************/

router.get('/auth', verifyToken, async (req, res) => {
    try {
        const userDetails = {
            id: req.user.id,
            email: req.user.email,
        };
        res.status(200).json(userDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
