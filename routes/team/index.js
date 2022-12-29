const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.ctx = { ...req.ctx, title: 'Our Team' }
    return res.render('pages/team', req.ctx)
});

module.exports = router;