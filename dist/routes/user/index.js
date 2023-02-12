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
const middlewares_1 = __importDefault(require("../../middlewares"));
const services_1 = __importDefault(require("../../services"));
const utils_1 = __importDefault(require("../../utils"));
const me_1 = __importDefault(require("./me"));
const router = express_1.default.Router();
router.use('/me', middlewares_1.default.auth.checkUnauthenticatedUserAndRedirect, middlewares_1.default.auth.populateMeInContext, me_1.default);
router.get('/:id', middlewares_1.default.http.numericParamsValidator, (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield services_1.default.user.fetchById(Number(id));
    return res.render("pages/user", Object.assign(Object.assign({}, req.ctx), { user, title: user.username }));
})));
router.get('/:id/posts', middlewares_1.default.http.numericParamsValidator, middlewares_1.default.http.limitQueryValidator, (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const limit = Number(req.query.limit || utils_1.default.http.limitQueryArray[0]);
    const page = Number(req.query.page) || 1;
    const { posts, total } = yield services_1.default.user.fetchPosts(id, limit, limit * (page - 1));
    const author = yield services_1.default.user.fetchAuthor(id);
    return res.render("pages/posts-1", Object.assign(Object.assign({}, req.ctx), { posts, meta: { pages: Math.round(total / Number(limit)), page, limit, total }, title: `${author.username}'s posts` }));
})));
router.get('/:id/posts/:postId', middlewares_1.default.http.numericParamsValidator, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
        const { id, postId } = req.params;
        const { author, nextPost, post, prevPost } = (yield services_1.default.user.fetchPostById(Number(id), Number(postId)));
        return res.render("pages/posts-1/id", Object.assign(Object.assign({}, req.ctx), { post: Object.assign(Object.assign({}, post), { url: {
                    back: utils_1.default.url.retrieveAppropriateBackUrl(req.headers["hx-current-url"], `/users/${id}/posts`),
                    prev: prevPost && `/users/${id}/posts/${prevPost.id}`,
                    next: nextPost && `/users/${id}/posts/${nextPost.id}`,
                } }), author, title: post.title }));
    }));
}));
exports.default = router;
//# sourceMappingURL=index.js.map