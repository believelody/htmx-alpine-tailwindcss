"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = __importDefault(require("../../../utils"));
const router = express_1.default.Router();
router.get('/update-action', (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => {
    var _a;
    req.ctx = Object.assign(Object.assign({}, req.ctx), { meta: (_a = req.session) === null || _a === void 0 ? void 0 : _a.meta });
    return res.render("partials/product/action", req.ctx);
}));
exports.default = router;
//# sourceMappingURL=index.js.map