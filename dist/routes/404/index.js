"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = __importDefault(require("../../utils"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => utils_1.default.error.handleHttpError(req, res, next, () => {
    res.setHeader('HX-Push', '/404');
    return res.render("pages/404", Object.assign(Object.assign({}, req.ctx), { title: "404 Not Found" }));
}));
exports.default = router;
//# sourceMappingURL=index.js.map