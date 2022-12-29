const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const blogs = [...Array(6)].map((_, index) => ({
        background: `https://picsum.photos/id/${Math.ceil(Math.random(6) * 100)}/200/300`,
        alt: "content " + (index + 1),
        title: "Raclette Blueberry Nextious Level",
        subtitle: "CATEGORY",
        content: "Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.",
        views: "1.2k",
        comments: 6,
        url: '/'
    }));
    req.ctx = { ...req.ctx, blogs, title: 'Blogs' };
    return res.render('pages/blog', req.ctx)
});

module.exports = router;