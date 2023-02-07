import express from 'express';
import utils from '../../utils';
const router = express.Router();

export const homeTitle = 'HTMX, Alpine JS & Tailwindcss';

router.get('/', (req, res, next) => utils.error.handleHttpError(req, res, next, () => {
    return res.render('pages/home', { ...req.ctx, title: homeTitle })
}));

export default router;