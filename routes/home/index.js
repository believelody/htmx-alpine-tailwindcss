import express from 'express';
const router = express.Router();

export const homeTitle = 'HTMX, Alpine JS & Tailwindcss';

router.get('/', (req, res) => {
    req.ctx = { ...req.ctx, title: homeTitle }
    return res.render('pages/home', req.ctx)
});

export default router;