"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.createJWT = exports.hashPassword = exports.comparePassword = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt = require("bcrypt");
var comparePassword = function (password, hash) {
    return bcrypt.compare(password, hash);
};
exports.comparePassword = comparePassword;
var hashPassword = function (password) {
    return bcrypt.hash(password, 8);
};
exports.hashPassword = hashPassword;
var createJWT = function (user) {
    var token = jsonwebtoken_1.default.sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
var protect = function (req, res, next) {
    var bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401).json({ message: 'No token provided.' });
        return;
    }
    var _a = bearer.split(' '), token = _a[1];
    if (!token) {
        res.status(401).json({ message: 'Not valid token provided.' });
        return;
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized token provided.' });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map