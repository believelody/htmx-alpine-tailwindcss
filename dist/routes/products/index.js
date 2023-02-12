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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsTitle = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("../../middlewares"));
const services_1 = __importDefault(require("../../services"));
const utils_1 = __importDefault(require("../../utils"));
const router = express_1.default.Router();
exports.productsTitle = 'Products';
router.get('/', middlewares_1.default.http.limitQueryValidator, (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const limit = Number(req.query.limit || utils_1.default.http.limitQueryArray[0]);
    const count = Number(req.query.count || limit);
    if (req.query.count && ((_a = req.ctx) === null || _a === void 0 ? void 0 : _a.fromHTMX)) {
        const { products, total } = yield services_1.default.product.fetchAll(limit, count - limit);
        if (req.session) {
            req.session.meta = { total, limit, count };
        }
        res.setHeader('HX-Trigger', 'update-context');
        return res.render('partials/product/list', Object.assign(Object.assign({}, req.ctx), { meta: { total, limit, count }, products }));
    }
    const { products, total } = yield services_1.default.product.fetchAll(count, 0);
    return res.render('pages/product', Object.assign(Object.assign({}, req.ctx), { products, meta: { total, limit, count }, title: exports.productsTitle }));
})));
exports.default = router;
//# sourceMappingURL=index.js.map