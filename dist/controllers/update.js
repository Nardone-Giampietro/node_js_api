"use strict";
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
exports.deleteUpdate = exports.postUpdate = exports.updateUpdate = exports.getUpdate = exports.getUpdates = void 0;
var db_1 = __importDefault(require("../db"));
// Get ALL Updates
var getUpdates = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId_1, allUpdates, updates, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId_1 = req.user.id;
                return [4 /*yield*/, db_1.default.update.findMany({
                        include: {
                            product: true
                        }
                    })];
            case 1:
                allUpdates = _a.sent();
                updates = allUpdates.filter(function (update) { return update.product.belongsToId === userId_1; });
                res.status(200).json({ data: updates });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUpdates = getUpdates;
// Get Update
var getUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updateId, updates, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                updateId = req.params.id;
                return [4 /*yield*/, db_1.default.update.findUnique({
                        where: {
                            id: updateId
                        }
                    })];
            case 1:
                updates = _a.sent();
                res.status(200).json({ data: updates });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUpdate = getUpdate;
// Update Update
var updateUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var update, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.default.update.update({
                        where: {
                            id: req.params.id
                        },
                        data: {
                            updatedAt: new Date(),
                            title: req.body.title || undefined,
                            body: req.body.body || undefined,
                            version: req.body.version || undefined,
                            status: req.body.status || undefined
                        }
                    })];
            case 1:
                update = _a.sent();
                res.status(200).json({ message: "Update has been successfully updated.", data: update });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUpdate = updateUpdate;
// Create Update
var postUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, title, body, status, update, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                productId = req.body.productId;
                title = req.body.title;
                body = req.body.body;
                status = req.body.status;
                return [4 /*yield*/, db_1.default.update.create({
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
                    })];
            case 1:
                update = _a.sent();
                res.status(200).json({ message: "Update has been successfully created.", data: update });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postUpdate = postUpdate;
// Delete Update
var deleteUpdate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, update, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, db_1.default.update.delete({
                        where: {
                            id: id
                        }
                    })];
            case 1:
                update = _a.sent();
                res.status(200).json({ message: "Update has been successfully deleted.", data: update });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUpdate = deleteUpdate;
//# sourceMappingURL=update.js.map