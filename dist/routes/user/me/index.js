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
exports.myProfileTodosTitle = exports.myProfilePostsTitle = exports.myProfileTitle = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("../../../middlewares"));
const services_1 = __importDefault(require("../../../services"));
const utils_1 = __importDefault(require("../../../utils"));
const router = express_1.default.Router();
exports.myProfileTitle = 'My Profile';
exports.myProfilePostsTitle = 'My Posts';
exports.myProfileTodosTitle = 'My Todos';
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return utils_1.default.error.handleHttpError(req, next, () => {
        return res.render("pages/user", Object.assign(Object.assign({}, req.ctx), { title: exports.myProfileTitle }));
    });
}));
router.get('/posts', middlewares_1.default.http.limitQueryValidator, (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const limit = Number(req.query.limit || utils_1.default.http.limitQueryArray[0]);
    const page = Number(req.query.page) || 1;
    const user = (_a = req.ctx) === null || _a === void 0 ? void 0 : _a.user;
    if (!user) {
        throw new Error("Error route /me/posts: user is null");
    }
    const { posts, total } = yield services_1.default.user.me.fetchPosts(user.id, limit, limit * (page - 1));
    return res.render("pages/posts-2", Object.assign(Object.assign({}, req.ctx), { posts, meta: { pages: Math.round(total / Number(limit)), page, limit, total }, title: exports.myProfilePostsTitle }));
})));
router.get('/posts/:id', middlewares_1.default.http.numericParamsValidator, (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const user = (_b = req.ctx) === null || _b === void 0 ? void 0 : _b.user;
    if (!user) {
        throw new Error("Error route /me/post:id: user is null");
    }
    const { author, nextPost, post, prevPost } = yield services_1.default.user.me.fetchPostById(user.id, Number(id));
    return res.render('pages/posts-2/id', Object.assign(Object.assign({}, req.ctx), { post: Object.assign(Object.assign({}, post), { url: {
                back: utils_1.default.url.retrieveAppropriateBackUrl(req.headers['hx-current-url'], `/users/${id}/posts`),
                prev: prevPost && `/users/me/posts/${prevPost.id}`,
                next: nextPost && `/users/me/posts/${nextPost.id}`
            } }), author, title: post.title }));
})));
exports.default = router;
//# sourceMappingURL=index.js.map