import {isAdminUser} from "../../middleware/authentication.js";
import {PrismaClient} from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/users", isAdminUser, async (req, res) => {
    try {
        const users = await prisma.users.findMany();

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

router.put('/user/:id', isAdminUser, async (req, res) => {
    const {id} = req.params;
    const {role} = req.body;
    try {
        const updatedUser = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                role: role
            }
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});
export default router;