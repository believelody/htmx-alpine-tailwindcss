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
const api_1 = __importDefault(require("../services/api"));
const populateUserSessionInContext = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const user = req.cookies.session_user;
    const token = req.cookies.session_token;
    if (req.session) {
        req.session.user = user !== null && user !== void 0 ? user : (_a = req.session) === null || _a === void 0 ? void 0 : _a.user;
        req.session.token = token !== null && token !== void 0 ? token : (_b = req.session) === null || _b === void 0 ? void 0 : _b.token;
        if (((_c = req.session) === null || _c === void 0 ? void 0 : _c.user) && ((_d = req.session) === null || _d === void 0 ? void 0 : _d.token)) {
            api_1.default.setHeader('Authorization', `Bearer ${req.session.token}`);
            req.ctx = Object.assign(Object.assign({}, req.ctx), { user: req.session.user, isAuthenticated: !!req.session.user });
        }
    }
    next();
});
exports.default = { populateUserSessionInContext };
//# sourceMappingURL=session.middleware.js.map