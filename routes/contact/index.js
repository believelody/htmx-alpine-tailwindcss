const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('pages/contact', req.ctx)
});

module.exports = router;