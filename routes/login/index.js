const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.ctx = { ...req.ctx, title: 'Login Page' }
    return res.render('pages/login', req.ctx)
});

module.exports = router;