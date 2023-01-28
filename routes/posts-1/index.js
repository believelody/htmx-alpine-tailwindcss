import fetch from 'node-fetch';
import express from 'express';
import utils from '../../src/js/utils';
import { numericParamsValidator } from '../../src/js/middlewares/http.middleware';
import { dummyDataURL } from '../../src/js/utils/env.util';
import { retrieveAppropriateBackUrl } from '../../src/js/utils/url.util';
const router = express.Router();

export const postsTitle = 'Posts with select pagination';

router.get('/', async (req, res, next) => {
    try {
        const limitArray = ['6', '18', '30'];
        if (req.query?.limit && !limitArray.includes(req.query.limit)) {
            if (req.ctx.fromHTMX) {
                throw "There is a problem with limit value";
            }
            req.ctx.error = utils.error500;
            res.statusCode = 500;
        } else {
            const limit = req.query.limit || limitArray[0];
            const page = Number(req.query.page) || 1;
            const postsRes = await fetch(`${dummyDataURL}/posts?limit=${limit}&skip=${Number(limit) * (page - 1)}`);
            const postsJson = await postsRes.json();
            const { total } = postsJson;
            const posts = postsJson.posts.map((post, index) => ({
                background: `https://picsum.photos/id/${Math.ceil(Math.random(6) * 100)}/200/300`,
                alt: "content " + (index + 1),
                title: post.title,
                content: post.body,
                views: new Intl.NumberFormat('fr', { notation: "compact" }).format(Math.ceil(Math.random() * 9999 + 1000)),
                comments: post.reactions * Math.ceil(Math.random() * 100 + 10),
                url: `/posts-1/${post.id}`,
                tags: post.tags,
                id: post.id,
                userId: post.userId,
            }));
            req.ctx = { ...req.ctx, posts, meta: { pages: Math.round(total / Number(limit)), page, limit, total }, title: postsTitle };
        }
        return res.render('pages/posts-1', req.ctx);
    } catch (error) {
        console.log("In get /posts-1 route : ", error);
        next(error);
    }
});

router.get('/:id', numericParamsValidator, async (req, res, next) => {
    try {
        const { id } = req.params;
        const postRes = await fetch(`${dummyDataURL}/posts/${id}`);
        const postJson = await postRes.json();
        const prevPostRes = await fetch(`${dummyDataURL}/posts/${Number(id) - 1}?select=id`);
        const prevPostJson = await prevPostRes.json();
        const nextPostRes = await fetch(`${dummyDataURL}/posts/${Number(id) + 1}?select=id`);
        const nextPostJson = await nextPostRes.json();
        const authorRes = await fetch(`${dummyDataURL}/users/${postJson.userId}?select=username,id`);
        const authorJson = await authorRes.json();
        delete postJson.userId;
        const post = { ...postJson, url: { back: retrieveAppropriateBackUrl(req.headers['hx-current-url'], '/posts-1'), prev: prevPostJson?.id && `/posts-1/${prevPostJson?.id}`, next: nextPostJson?.id && `/posts-1/${nextPostJson?.id}` } };
        return res.render('pages/posts-1/id', { ...req.ctx, post, author: authorJson, title: post.title });
    } catch (error) {
        console.log(`In get /posts-1/${req.params.id} route : `, error);
        next(error);
    }
})

export default router;