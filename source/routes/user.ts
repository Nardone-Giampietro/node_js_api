import * as UserController from '../controllers/user';
import {Router} from 'express';
import {body, validationResult } from 'express-validator';
import prisma from "../db";
import {handleInputErrors} from "../modules/middleware";
const router = Router();

router.post('/create',
    body("username")
        .notEmpty()
        .isString()
        .isLength({max: 255})
        .custom(async value =>{
            try {
                const userExist = await prisma.user.findUnique({
                    where: {
                        username: value
                    }
                });
                if (userExist) {
                    throw new Error("User already exists");
                }
            } catch (error) {
                throw error;
            }
        }),
    body("password")
        .notEmpty()
        .isString(),
    handleInputErrors,
    UserController.createUser);
router.post("/signin",
    body("username")
        .notEmpty()
        .isString(),
    body("password")
        .notEmpty()
        .isString(),
    handleInputErrors,
    UserController.signIn);

export default router;
