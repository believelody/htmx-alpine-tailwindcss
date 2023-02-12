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
router.post('/1', (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield new Promise(r => setTimeout(r, 2000));
    // throw new Error('');
    const user = (_a = req.ctx) === null || _a === void 0 ? void 0 : _a.user;
    if (user === null || user === void 0 ? void 0 : user.subscribed) {
        res.status(400).send({ subscription: 'Your email already exists. Try something else or contact us for more help.' });
    }
    else if (user) {
        user.subscribed = true;
        if (req.session) {
            req.session.user = user;
        }
    }
    return res.render("partials/success/subscription", Object.assign(Object.assign({}, req.ctx), { user }));
})));
router.post('/2', (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    yield new Promise(r => setTimeout(r, 2000));
    const user = (_b = req.ctx) === null || _b === void 0 ? void 0 : _b.user;
    if (user === null || user === void 0 ? void 0 : user.subscribed) {
        res.status(400).json({ subscription: 'Your email already exists. Try something else or contact us for more help.' });
    }
    else if (user) {
        if (req.session) {
            req.session.user = Object.assign(Object.assign({}, user), { subscribed: true });
        }
    }
    return res.json({ success: true });
})));
exports.default = router;
//# sourceMappingURL=index.js.map