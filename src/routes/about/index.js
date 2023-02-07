import express from 'express';
import service from '../../services';
import utils from '../../utils';

const router = express.Router();

router.get('/', (req, res, next) => utils.error.handleHttpError(req, res, next, async (req, res) => {
    const cards = await service.about.fetchAll();
    req.ctx = { ...req.ctx, cards, title: 'About Us' };
    return res.render('pages/about', req.ctx);
}));

export default router;