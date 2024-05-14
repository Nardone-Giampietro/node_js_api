import jwt from 'jsonwebtoken';
import bcrypt = require('bcrypt');

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 8);
}

export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
        },
        process.env.JWT_SECRET);
    return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401).json({message: 'No token provided.'});
        return;
    }

    const [, token] = bearer.split(' ');

    if (!token) {
        res.status(401).json({message: 'Not valid token provided.'});
        return;
    }

    try  {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error){
        console.error(error);
        res.status(401).json({message: 'Not authorized token provided.'});
    }
}

