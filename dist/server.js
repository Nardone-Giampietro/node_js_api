"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var product_1 = __importDefault(require("./routes/product"));
var update_1 = __importDefault(require("./routes/update"));
var updatePoint_1 = __importDefault(require("./routes/updatePoint"));
var user_1 = __importDefault(require("./routes/user"));
var auth_1 = require("./modules/auth");
var app = (0, express_1.default)();
var secretMiddleware = function (req, res, next) {
    req.secret_middleware = "secret message";
    next();
};
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(secretMiddleware);
app.use("/api", auth_1.protect, [product_1.default, update_1.default, updatePoint_1.default]);
app.use("/user", user_1.default);
app.get("/", function (req, res, next) {
    res.status(200).json({ message: "Welcome to the server!" });
});
app.use(function (err, req, res, next) {
    if (err.type === "auth") {
        res.status(401).json({ message: 'unauthorized' });
    }
    else if (err.type === "input") {
        res.status(400).json({ message: 'invalid input' });
    }
    else {
        var error = JSON.stringify(err, Object.getOwnPropertyNames(err));
        res.status(500).json({ error: error });
    }
});
exports.default = app;
//# sourceMappingURL=server.js.map