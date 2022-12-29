const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const cards = [...Array(12)].map((_, index) => ({
        src: `https://dummyimage.com/72${index}x40${index}`,
        alt: "content " + (index + 1),
        title: "Chichen Itza",
        subtitle: "SUBTITLE",
        content: "Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche."
    }));
    req.ctx = { ...req.ctx, cards, title: 'About Us' };
    return res.render('pages/about', req.ctx)
});

module.exports = router;