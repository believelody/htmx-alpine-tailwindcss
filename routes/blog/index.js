import fetch from 'node-fetch';
import express from 'express';
import { error500 } from '../../server';
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const limitArray = ['6', '18', '30'];
        if (req.query?.limit && !limitArray.includes(req.query.limit)) {
            if (req.ctx.fromHTMX) {
                throw "There is a problem with limit value";
            }
            req.ctx.error = error500;
            res.statusCode = 500;
        } else {
            const limit = req.query.limit || limitArray[0];
            const page = parseInt(req.query.page) || 1;
            const postsRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts?limit=${limit}&skip=${parseInt(limit) * (page - 1)}`);
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
            req.ctx = { ...req.ctx, blogs, meta: { pages: Math.round(total / parseInt(limit)), page, limit }, title: 'Blogs' };
        }
        return res.render('pages/blog', req.ctx);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/:id', (req, res, next) => {
    try {
        console.log(req.params)
        console.log(req.params.id.match(/\d/g));
        return res.render('pages/blog/id', req.ctx);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

export default router;