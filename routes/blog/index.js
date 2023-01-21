import fetch from 'node-fetch';
import express from 'express';
import utils from '../../src/js/utils';
import { numericParamsValidator } from '../../src/js/middlewares/http.middleware';
const router = express.Router();

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
            const postsRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts?limit=${limit}&skip=${Number(limit) * (page - 1)}`);
            const postsJson = await postsRes.json();
            const { posts, total } = postsJson;
            const blogs = posts.map((post, index) => ({
                background: `https://picsum.photos/id/${Math.ceil(Math.random(6) * 100)}/200/300`,
                alt: "content " + (index + 1),
                title: post.title,
                content: post.body,
                views: new Intl.NumberFormat('fr', { notation: "compact" }).format(Math.ceil(Math.random() * 9999 + 1000)),
                comments: post.reactions * Math.ceil(Math.random() * 100 + 10),
                url: `/blog/${post.id}`,
                tags: post.tags,
                id: post.id,
                userId: post.userId,
            }));
            req.ctx = { ...req.ctx, blogs, meta: { pages: Math.round(total / Number(limit)), page, limit, total }, title: 'Blogs' };
        }
        return res.render('pages/blog', req.ctx);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/:id', numericParamsValidator, async (req, res, next) => {
    try {
        const postRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts/${req.params.id}`);
        const postJson = await postRes.json();
        const prevPostRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts/${Number(req.params.id) - 1}?select=id`);
        const prevPostJson = await prevPostRes.json();
        const nextPostRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts/${Number(req.params.id) + 1}?select=id`);
        const nextPostJson = await nextPostRes.json();
        const authorRes = await fetch(`${process.env.DUMMY_DATA_URL}/users/${postJson.userId}?select=username`);
        const authorJson = await authorRes.json();
        delete postJson.userId;
        const post = { ...postJson, author: authorJson, prev: prevPostJson.id, next: nextPostJson.id };
        req.ctx = { ...req.ctx, post, title: post.title };
        return res.render('pages/blog/id', req.ctx);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

export default router;