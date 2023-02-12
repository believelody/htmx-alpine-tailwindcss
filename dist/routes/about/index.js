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
const services_1 = __importDefault(require("../../services"));
const utils_1 = __importDefault(require("../../utils"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => utils_1.default.error.handleHttpError(req, res, next, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cards = yield services_1.default.about.fetchAll();
    req.ctx = Object.assign(Object.assign({}, req.ctx), { cards, title: 'About Us' });
    return res.render('pages/about', req.ctx);
})));
exports.default = router;
//# sourceMappingURL=index.js.map