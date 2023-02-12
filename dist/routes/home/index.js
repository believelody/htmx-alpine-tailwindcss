"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeTitle = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = __importDefault(require("../../utils"));
const router = express_1.default.Router();
exports.homeTitle = 'HTMX, Alpine JS & Tailwindcss';
router.get('/', (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => {
    return res.render('pages/home', Object.assign(Object.assign({}, req.ctx), { title: exports.homeTitle }));
}));
exports.default = router;
//# sourceMappingURL=index.js.map