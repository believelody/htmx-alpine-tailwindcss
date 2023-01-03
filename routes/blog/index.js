import fetch from 'node-fetch';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    const limitArray = ['6', '18', '30'];
    const limit = limitArray.includes(req.query.limit) ? req.query.limit : limitArray[0]; 
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
    return res.render('pages/blog', req.ctx)
});

export default router;