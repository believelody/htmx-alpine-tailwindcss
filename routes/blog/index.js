import fetch from 'node-fetch';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    const postsRes = await fetch(`${process.env.DUMMY_DATA_URL}/posts?limit=10`);
    const { posts } = await postsRes.json();
    console.log(posts);
    const blogs = posts.map((post, index) => ({
        background: `https://picsum.photos/id/${Math.ceil(Math.random(6) * 100)}/200/300`,
        alt: "content " + (index + 1),
        title: post.title,
        content: post.body,
        views: new Intl.NumberFormat('fr', { notation: "compact" }).format(Math.ceil(Math.random() * 1000 + 100)),
        comments: post.reactions * Math.ceil(Math.random()*100 + 10),
        url: `/blog/${post.id}`,
        tags: post.tags,
        id: post.id,
        userId: post.userId,
    }));
    req.ctx = { ...req.ctx, blogs, title: 'Blogs' };
    return res.render('pages/blog', req.ctx)
});

export default router;