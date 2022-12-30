import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    req.ctx = { ...req.ctx, title: 'Contact Us' }
    return res.render('pages/contact', req.ctx)
});

export default router;