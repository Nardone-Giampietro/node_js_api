import { Router } from 'express';
import * as ProductControllers from '../controllers/product';
import {body, param, validationResult } from 'express-validator';
import {handleInputErrors} from "../modules/middleware";
import prisma from "../db";
const router = Router();

router.get('/product/:id',
    param("id")
        .custom(async (value, {req}) =>{
            const product = await prisma.product.findUnique({
                where: {
                    id: value
                }
            });
            if (req.user.id !== product.belongsToId){
                throw new Error("User cannot get this product");
            }
        }),
    handleInputErrors,
    ProductControllers.getProduct);
router.get('/products',
    handleInputErrors,
    ProductControllers.getProducts);
router.put('/product/:id',
    param("id")
        .custom(async (value, {req}) =>{
            const product = await prisma.product.findUnique({
                where: {
                    id: value
                }
            });
            if (req.user.id !== product.belongsToId){
                throw new Error("User cannot update this product");
            }
        }),
    body("name")
        .notEmpty()
        .isString(),
    handleInputErrors,
    ProductControllers.updateProduct);
router.post('/product',
    body("name")
        .notEmpty()
        .isString()
        .isLength({max: 255}),
    handleInputErrors,
    ProductControllers.createProduct);
router.delete('/product/:id',
    param("id")
        .custom(async (value, {req}) =>{
            const product = await prisma.product.findUnique({
                where: {
                    id: value
                }
            });
            if (req.user.id !== product.belongsToId){
                throw new Error("User cannot delete this product");
            }
        }),
    handleInputErrors,
    (req, res) => {});

export default router