import prisma from "../db";
import {comparePassword, createJWT, hashPassword} from "../modules/auth";

export const createUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
            }
        });
        const token = createJWT(user);
        res.json({token: token});
    }
    catch (error){
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        });
        const isValid = await comparePassword(req.body.password, user.password);
        if (!isValid) {
            res.status(401).json({message: 'Invalid Password.'});
            return;
        }
        const token = createJWT(user);
        res.json({token: token});
    }
    catch (error) {
        next(error);
    }
}