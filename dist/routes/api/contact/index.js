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
const express_1 = __importDefault(require("express"));
const utils_1 = __importDefault(require("../../../utils"));
const router = express_1.default.Router();
router.post("/1", (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(resolve => setTimeout(resolve, 3000));
    res.setHeader('HX-Trigger', 'signal');
    return res.render('partials/form/contact', Object.assign(Object.assign({}, req.ctx), { notify: { type: 'success', title: 'Contact', message: 'Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.', } }));
})));
router.post("/2", (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(resolve => setTimeout(resolve, 3000));
    return res.json({
        notify: { type: 'success', title: 'Contact', message: 'Nous avons bien reçu votre demande. Nous reviendrons vers vous dans les plus brefs délai.' }
    });
})));
exports.default = router;
//# sourceMappingURL=index.js.map