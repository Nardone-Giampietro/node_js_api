import prisma from "../db";

// Get ALL Products
export const getProducts = async (req, res, next) => {
    try{
        const match = await prisma.product.findMany({
            where:{
                belongsToId: req.user.id
            },
            include: {
                updates: true
            }
        });
        res.status(200).json({data: match});
    }
    catch (error){
        next(error);
    }
}

// Get ONE Product
export const getProduct = async (req, res, next) => {
    try{
        const productId = req.params.id;
        const product = await prisma.product.findUnique({
            where:{
                id: productId
            }
        });
        res.status(200).json({data: product });
    }
    catch (error){
        next(error);
    }
}

// Create Product
export const createProduct = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const name = req.body.name;
        const product = await prisma.product.create({
            data: {
                name: name,
                belongsToId: req.user.id,
            }
        });
        res.status(201).json({message: "Product created successfully.", data: product});
    }
    catch (error){
        next(error);
    }
}

// Update Product
export const updateProduct = async (req, res, next) => {
    try{
        const productId = req.params.id;
        const name = req.body.name;
        const product = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name: name
            }
        });
        res.status(201).json({message: "Product has been updated", data: product});
    }
    catch (error){
        next(error);
    }
}

// Delete Product
export const deleteProduct = async (req, res, next) => {
    try{
        const productId = req.params.id;
        const product = await prisma.product.delete({
            where: {
                id: productId
            }
        });
        res.status(200).json({message: "Product deleted successfully.", data: product});
    }
    catch (error){
        next(error);
    }
}