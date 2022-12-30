import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    req.ctx = { ...req.ctx, title: 'HTMX, Alpine JS & Tailwindcss'}
    return res.render('pages/home', req.ctx)
});

export default router;