const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.ctx = { ...req.ctx, title: 'Contact Us' }
    return res.render('pages/contact', req.ctx)
});

module.exports = router;