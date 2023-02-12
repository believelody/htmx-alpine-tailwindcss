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
exports.postsTitle = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("../../middlewares"));
const services_1 = __importDefault(require("../../services"));
const utils_1 = __importDefault(require("../../utils"));
const router = express_1.default.Router();
exports.postsTitle = 'Posts with input pagination';
router.get("/", middlewares_1.default.http.limitQueryValidator, (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number(req.query.limit || utils_1.default.http.limitQueryArray[0]);
    const page = Number(req.query.page) || 1;
    const { posts, total } = yield services_1.default.post.fetchAll(limit, limit * (page - 1), "/posts-2");
    return res.render("pages/posts-2", Object.assign(Object.assign({}, req.ctx), { posts, meta: { pages: Math.round(total / limit), page, limit, total }, title: exports.postsTitle }));
})));
router.get('/:id', middlewares_1.default.http.numericParamsValidator, (req, res, next) => utils_1.default.error.handleHttpError(req, next, () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const { post, prevPost, nextPost, author } = yield services_1.default.post.fetchById(Number(id));
    const user = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user;
    const liked = (_b = user === null || user === void 0 ? void 0 : user.likedPosts) === null || _b === void 0 ? void 0 : _b.includes(Number(id));
    return res.render('pages/posts-2/id', Object.assign(Object.assign({}, req.ctx), { post: Object.assign(Object.assign({}, post), { liked, reactions: liked ? ++post.reactions : post.reactions, url: {
                back: utils_1.default.url.retrieveAppropriateBackUrl(req.headers['hx-current-url'], '/posts-2'),
                prev: prevPost.id && `/posts-2/${prevPost.id}`,
                next: nextPost.id && `/posts-2/${nextPost.id}`
            } }), author, title: post.title }));
})));
exports.default = router;
//# sourceMappingURL=index.js.map