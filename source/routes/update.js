"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var UpdatesController = __importStar(require("../controllers/update"));
var express_validator_1 = require("express-validator");
var db_1 = __importDefault(require("../db"));
var middleware_1 = require("../modules/middleware");
router.get('/update', UpdatesController.getUpdates);
router.get('/update/:id', (0, express_validator_1.param)("id")
    .notEmpty()
    .custom(function (value_1, _a) { return __awaiter(void 0, [value_1, _a], void 0, function (value, _b) {
    var userId, update, productId, product, error_1;
    var req = _b.req;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userId = req.user.id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.default.update.findUnique({
                        where: {
                            id: value
                        }
                    })];
            case 2:
                update = _c.sent();
                productId = update.productId;
                return [4 /*yield*/, db_1.default.product.findUnique({
                        where: {
                            id: productId
                        }
                    })];
            case 3:
                product = _c.sent();
                if (product.belongsToId !== userId) {
                    throw new Error("User cannot see this update");
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                throw error_1;
            case 5: return [2 /*return*/];
        }
    });
}); }), middleware_1.handleInputErrors, UpdatesController.getUpdate);
router.put('/update/:id', (0, express_validator_1.body)("title").optional(), (0, express_validator_1.body)("body").optional(), (0, express_validator_1.body)("version").optional(), (0, express_validator_1.body)("status")
    .optional()
    .isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]), (0, express_validator_1.param)("id")
    .notEmpty()
    .custom(function (value_1, _a) { return __awaiter(void 0, [value_1, _a], void 0, function (value, _b) {
    var userId, update, productId, product;
    var req = _b.req;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userId = req.user.id;
                return [4 /*yield*/, db_1.default.update.findUnique({
                        where: {
                            id: value
                        }
                    })];
            case 1:
                update = _c.sent();
                productId = update.productId;
                return [4 /*yield*/, db_1.default.product.findUnique({
                        where: {
                            id: productId
                        }
                    })];
            case 2:
                product = _c.sent();
                if (product.belongsToId !== userId) {
                    throw new Error("User cannot update this product");
                }
                return [2 /*return*/];
        }
    });
}); }), middleware_1.handleInputErrors, UpdatesController.updateUpdate);
router.post('/update', (0, express_validator_1.body)("title").exists().isString(), (0, express_validator_1.body)("body").exists().isString(), (0, express_validator_1.body)("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]), (0, express_validator_1.body)("productId")
    .exists()
    .isString()
    .custom(function (value_1, _a) { return __awaiter(void 0, [value_1, _a], void 0, function (value, _b) {
    var match;
    var req = _b.req;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, db_1.default.product.findUnique({
                    where: {
                        id: value
                    }
                })];
            case 1:
                match = _c.sent();
                if (match.belongsToId !== req.user.id) {
                    throw new Error("User cannot update this product");
                }
                return [2 /*return*/];
        }
    });
}); }), middleware_1.handleInputErrors, UpdatesController.postUpdate);
router.delete('/update/:id', (0, express_validator_1.body)("productId")
    .exists()
    .isString()
    .custom(function (value_1, _a) { return __awaiter(void 0, [value_1, _a], void 0, function (value, _b) {
    var userId, update, productId, product;
    var req = _b.req;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userId = req.user.id;
                return [4 /*yield*/, db_1.default.update.findUnique({
                        where: {
                            id: value
                        }
                    })];
            case 1:
                update = _c.sent();
                productId = update.productId;
                return [4 /*yield*/, db_1.default.product.findUnique({
                        where: {
                            id: productId
                        }
                    })];
            case 2:
                product = _c.sent();
                if (product.belongsToId !== userId) {
                    throw new Error("User cannot delete this update");
                }
                return [2 /*return*/];
        }
    });
}); }), middleware_1.handleInputErrors, UpdatesController.deleteUpdate);
exports.default = router;
//# sourceMappingURL=update.js.map