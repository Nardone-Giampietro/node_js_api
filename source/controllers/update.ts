import prisma from "../db";

// Get ALL Updates
export const getUpdates = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const allUpdates = await prisma.update.findMany({
            include: {
                product: true
            }
        });
        const updates = allUpdates.filter(update => update.product.belongsToId === userId);
        res.status(200).json({data: updates});
    }
    catch (error){
        next(error);
    }
}

// Get Update
export const getUpdate = async (req, res, next) => {
    try {
        const updateId = req.params.id;
        const updates = await prisma.update.findUnique({
            where: {
                id: updateId
            }
        });
        res.status(200).json({data: updates});
    }
    catch (error){
        next(error);
    }
}

// Update Update
export const updateUpdate = async (req, res, next) => {
    try {
        const update = await prisma.update.update({
            where : {
                id: req.params.id
            },
            data: {
                updatedAt: new Date(),
                title: req.body.title || undefined,
                body: req.body.body || undefined,
                version: req.body.version || undefined,
                status: req.body.status || undefined
            }
        });
        res.status(200).json({message: "Update has been successfully updated.", data: update});
    }
    catch (error) {
        next(error);
    }
}

// Create Update
export const postUpdate = async (req, res, next) => {
    try {
        const productId = req.body.productId;
        const title = req.body.title;
        const body = req.body.body;
        const status = req.body.status;
        const update = await prisma.update.create({
            data: {
                title: title,
                updatedAt: new Date(),
                body: body,
                status: status,
                productId: productId
            },
            include: {
                product: true
            }
        });
        res.status(200).json({message: "Update has been successfully created.", data: update});}
    catch (error) {
        next(error);
    }
}

// Delete Update
export const deleteUpdate = async (req, res, next) => {
    try {
        const id = req.params.id;
        const update = await prisma.update.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({message: "Update has been successfully deleted.", data: update});
    }
    catch (error) {
        next(error);
    }
}