import express from 'express';
const router = express.Router();

export const homeTitle = 'HTMX, Alpine JS & Tailwindcss';

router.get('/', (req, res) => {
    return res.render('pages/home', { ...req.ctx, title: homeTitle })
});

export default router;