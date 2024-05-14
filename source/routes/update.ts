import { Router } from 'express';
const router = Router();
import * as UpdatesController from "../controllers/update"
import {body, param, validationResult} from 'express-validator';
import prisma from "../db";
import {handleInputErrors} from "../modules/middleware";

router.get('/update', UpdatesController.getUpdates);
router.get('/update/:id',
    param("id")
        .notEmpty()
        .custom(async (value, {req}) =>{
            const userId = req.user.id;
            try{
                const update =  await prisma.update.findUnique({
                    where: {
                        id: value
                    }
                });
                const productId = update.productId;
                const product = await prisma.product.findUnique({
                    where: {
                        id: productId
                    }
                });
                if (product.belongsToId !== userId){
                    throw new Error("User cannot see this update");
                }
            }
            catch (error) {
                throw error;
            }

        }),
    handleInputErrors,
    UpdatesController.getUpdate);
router.put('/update/:id',
    body("title").optional(),
    body("body").optional(),
    body("version").optional(),
    body("status")
        .optional()
        .isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
    param("id")
        .notEmpty()
        .custom(async (value, {req}) =>{
            const userId = req.user.id;
            const update =  await prisma.update.findUnique({
                where: {
                    id: value
                }
            });
            const productId = update.productId;
            const product = await prisma.product.findUnique({
                where: {
                    id: productId
                }
            });
            if (product.belongsToId !== userId){
                throw new Error("User cannot update this product");
            }
        }),
    handleInputErrors,
    UpdatesController.updateUpdate);
router.post('/update',
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
    body("productId")
        .exists()
        .isString()
        .custom(async (value, {req}) =>{
            const match =  await prisma.product.findUnique({
                where: {
                    id: value
                }
            });
            if (match.belongsToId !== req.user.id){
                throw new Error("User cannot update this product");
            }
        }),
    handleInputErrors,
    UpdatesController.postUpdate);
router.delete('/update/:id',
    body("productId")
        .exists()
        .isString()
        .custom(async (value, {req}) =>{
            const userId = req.user.id;
            const update =  await prisma.update.findUnique({
                where: {
                    id: value
                }
            });
            const productId = update.productId;
            const product = await prisma.product.findUnique({
                where: {
                    id: productId
                }
            });
            if (product.belongsToId !== userId){
                throw new Error("User cannot delete this update");
            }
        }),
    handleInputErrors,
    UpdatesController.deleteUpdate);

export default router;