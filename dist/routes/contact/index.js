"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactTitle = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = __importDefault(require("../../utils"));
const router = express_1.default.Router();
exports.contactTitle = 'Contact Us';
router.get('/', (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => {
    return res.render('pages/contact', Object.assign(Object.assign({}, req.ctx), { title: exports.contactTitle }));
}));
exports.default = router;
//# sourceMappingURL=index.js.map