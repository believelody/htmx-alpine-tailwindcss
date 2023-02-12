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
const fetchPosts = (id, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield api_1.default.auth.get(`/users/${id}/posts?limit=${limit}&skip=${skip}`);
    const posts = utils_1.default.user.constructPosts(res.posts);
    return { posts, total: res.total };
});
const fetchPostById = (id, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const { posts } = yield api_1.default.auth.get(`/users/${id}/posts`);
    const post = posts.find((post) => post.id === postId);
    if (!post) {
        throw `Post ${postId} not found`;
    }
    const postIndex = posts.findIndex((post) => post.id === (post === null || post === void 0 ? void 0 : post.id));
    const prevPost = posts[postIndex - 1];
    const nextPost = posts[postIndex + 1];
    const author = yield __1.default.user.fetchAuthor(id);
    // delete post.userId;
    return { post, prevPost, nextPost, author };
});
const reactToPost = (id, reactions) => __awaiter(void 0, void 0, void 0, function* () {
    return yield api_1.default.auth.put(`/posts/${id}`, {
        body: { reactions }
    });
});
const commentPost = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return yield api_1.default.auth.post(`/comments/add`, { body: { body } });
});
exports.default = { fetchPosts, fetchPostById, reactToPost, commentPost };
//# sourceMappingURL=me.js.map