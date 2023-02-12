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
const __1 = __importDefault(require(".."));
const utils_1 = __importDefault(require("../../utils"));
const api_1 = __importDefault(require("../api"));
const fetchAll = (limit, skip, detailBaseURL) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield api_1.default.get(`/posts?limit=${limit}&skip=${skip}`);
    const posts = utils_1.default.post.constructPosts(res.posts, detailBaseURL);
    return { posts, total: res.total };
});
const fetchById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield api_1.default.get(`/posts/${id}`);
    const prevPost = yield api_1.default.get(`/posts/${id - 1}?select=id`);
    const nextPost = yield api_1.default.get(`/posts/${id + 1}?select=id`);
    const author = yield __1.default.user.fetchAuthor(post.userId);
    // delete post.userId;
    return { post, prevPost, nextPost, author };
});
const fetchPostComments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield api_1.default.get(`/comments/post/${id}`);
});
exports.default = { fetchAll, fetchById, fetchPostComments };
//# sourceMappingURL=index.js.map