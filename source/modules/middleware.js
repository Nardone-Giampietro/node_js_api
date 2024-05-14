"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInputErrors = void 0;
var express_validator_1 = require("express-validator");
var handleInputErrors = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.handleInputErrors = handleInputErrors;
//# sourceMappingURL=middleware.js.map