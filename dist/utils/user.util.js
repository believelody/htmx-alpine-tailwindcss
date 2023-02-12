"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constructPosts = (posts, userId = null) => posts.map((post, index) => ({
    background: `https://picsum.photos/id/${Math.ceil(Math.random() * 100)}/200/300`,
    alt: "content " + (index + 1),
    title: post.title,
    content: post.body,
    views: new Intl.NumberFormat('fr', { notation: "compact" }).format(Math.ceil(Math.random() * 9999 + 1000)),
    comments: post.reactions * Math.ceil(Math.random() * 100 + 10),
    url: `/users/${userId !== null && userId !== void 0 ? userId : "me"}/posts/${post.id}`,
    tags: post.tags,
    id: post.id,
    userId: post.userId,
}));
exports.default = { constructPosts };
//# sourceMappingURL=user.util.js.map