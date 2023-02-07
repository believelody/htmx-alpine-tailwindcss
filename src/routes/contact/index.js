import express from 'express';
import utils from '../../utils';
const router = express.Router();

export const contactTitle = 'Contact Us';

router.get('/', (req, res, next) => utils.error.handleHttpError(req, res, next, () => {
    return res.render('pages/contact', { ...req.ctx, title: contactTitle })
}));

export default router;