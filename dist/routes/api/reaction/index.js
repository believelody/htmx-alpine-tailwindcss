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
const middlewares_1 = __importDefault(require("../../../middlewares"));
const services_1 = __importDefault(require("../../../services"));
const utils_1 = __importDefault(require("../../../utils"));
const router = express_1.default.Router();
router.post("/post/:id", middlewares_1.default.http.numericParamsValidator, (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const { id } = req.params;
    const isPostLiked = (_c = (_b = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.likedPosts) === null || _c === void 0 ? void 0 : _c.includes(Number(id));
    const reactions = isPostLiked
        ? Number(req.body.reaction) - 1
        : Number(req.body.reaction) + 1;
    const post = yield services_1.default.user.me.reactToPost(req.params.id, {
        reactions,
    });
    if ((_d = req.session) === null || _d === void 0 ? void 0 : _d.user) {
        req.session.user.likedPosts = ((_e = req.session.user.likedPosts) === null || _e === void 0 ? void 0 : _e.length)
            ? isPostLiked
                ? (_f = req.session.user.likedPosts) === null || _f === void 0 ? void 0 : _f.filter((l) => l !== Number(id))
                : [Number(id), ...req.session.user.likedPosts]
            : [];
        if (req.cookies.session_remember) {
            res.cookie("session_user", req.session.user);
        }
    }
    return res.redirect(new URL(req.headers["hx-current-url"]).pathname);
})));
exports.default = router;
//# sourceMappingURL=index.js.map