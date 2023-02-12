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
const services_1 = __importDefault(require("../../../services"));
const api_1 = __importDefault(require("../../../services/api"));
const utils_1 = __importDefault(require("../../../utils"));
const home_1 = require("../../home");
const me_1 = require("../../user/me");
const router = express_1.default.Router();
router.post('/login', (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // await new Promise(resolve => setTimeout(resolve, 3000));
    let token = "";
    const { email, password } = req.body;
    const loginRes = yield services_1.default.auth.login({ username: email, password });
    // if (loginRes.message) {
    //   return res.status(404).send({ login: loginRes.message });
    // }
    if (loginRes.token) {
        token = loginRes.token;
    }
    const user = Object.assign(Object.assign(Object.assign({}, (_a = req.ctx) === null || _a === void 0 ? void 0 : _a.user), loginRes), { subscribed: false, likedPosts: [] });
    if (req.session) {
        req.session.token = token;
        req.session.remember = true;
        req.session.user = user;
        req.session.cookie.maxAge = utils_1.default.session.sessionMaxAge30Days;
    }
    api_1.default.setHeader("Authorization", `Bearer ${token}`);
    if (req.body.remember) {
        res.cookie("session_token", token, { maxAge: utils_1.default.session.sessionMaxAge30Days });
        res.cookie("session_user", user, { maxAge: utils_1.default.session.sessionMaxAge30Days });
        res.cookie("session_remember", req.body.remember, { maxAge: utils_1.default.session.sessionMaxAge30Days });
    }
    res.setHeader('HX-Trigger', 'check-auth');
    if (req.body.stay_on_current_url) {
        return res.redirect(new URL(req.headers['hx-current-url']).pathname);
    }
    res.setHeader('HX-Push', '/users/me');
    return res.render('pages/user', Object.assign(Object.assign({}, req.ctx), { user, isAuthenticated: true, me: true, title: me_1.myProfileTitle }));
})));
router.get('/check', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        return res.render(`partials/auth/${req.query.component}`, Object.assign(Object.assign({}, req.ctx), { currentURLPathname: (_b = req.session) === null || _b === void 0 ? void 0 : _b.currentURLPathname }));
    }));
}));
router.post('/logout', (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    (_c = req.session) === null || _c === void 0 ? void 0 : _c.destroy(err => {
        if (err) {
            throw err;
        }
    });
    res.clearCookie("session_user");
    res.clearCookie("session_token");
    res.clearCookie("session_remember");
    res.setHeader('HX-Push', '/');
    res.setHeader('HX-Trigger', 'check-auth');
    return res.render('pages/home', Object.assign(Object.assign({}, req.ctx), { isAuthenticated: false, title: home_1.homeTitle }));
})));
exports.default = router;
//# sourceMappingURL=index.js.map