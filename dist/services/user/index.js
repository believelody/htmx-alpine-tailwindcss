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
const utils_1 = __importDefault(require("../../utils"));
const api_1 = __importDefault(require("../api"));
const me_1 = __importDefault(require("./me"));
const fetchById = (id, fields = []) => __awaiter(void 0, void 0, void 0, function* () {
    const path = `/users/${id}`;
    if (fields.length) {
        path.concat(`?select=${fields.join(',')}`);
    }
    return yield api_1.default.get(path);
});
const fetchAuthor = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield fetchById(id, ['username', 'id']); });
const fetchPosts = (id, limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield api_1.default.get(`/users/${id}/posts?limit=${limit}&skip=${skip}`);
    if (res.message) {
        return { message: res.message };
    }
    const posts = utils_1.default.user.constructPosts(res.posts, id);
    return { posts, total: res.total };
});
const fetchPostById = (id, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const { posts, message } = yield api_1.default.get(`/users/${id}/posts`);
    if (message) {
        return { message };
    }
    const post = posts.find((post) => post.id === postId);
    if (!post) {
        return { message: `Post ${postId} not found` };
    }
    const postIndex = posts.findIndex((post) => post.id === (post === null || post === void 0 ? void 0 : post.id));
    const prevPost = posts[postIndex - 1];
    const nextPost = posts[postIndex + 1];
    const author = yield fetchAuthor(id);
    // delete post.userId;
    return { post, prevPost, nextPost, author };
});
exports.default = { fetchById, fetchPosts, fetchPostById, fetchAuthor, me: me_1.default };
//# sourceMappingURL=index.js.map