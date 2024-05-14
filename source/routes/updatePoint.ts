import { Router } from 'express';
import {body, param, validationResult } from 'express-validator';
const router = Router();
import {handleInputErrors} from "../modules/middleware";
import prisma from "../db";


router.get('/update_point', (req, res) => {});
router.get('/update_point/:id', (req, res) => {});
router.put('/update_point/:id',
    body("name").optional().isString(),
    body("description").optional().isString(),
    param("id")
        .custom(async (value, {req}) =>{
            const math = await prisma.product.findUnique({
                where: {
                    id: value
                }
            });
            const belongsTo = math.belongsToId;
            if (req.user.id !== belongsTo){
                throw new Error("User cannot update this product");
            }
        }),
    (req, res) => {});
router.post('/update_point',
    body("name")
        .notEmpty()
        .isString()
        .isLength({max: 255}),
    body("description")
        .notEmpty()
        .isString(),
    body("updateId").exists().isString(),
    handleInputErrors,
    (req, res) => {});
router.delete('/update_point/:id', (req, res) => {});

export default router;