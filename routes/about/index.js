import express from 'express';
import service from '../../src/js/services';
const router = express.Router();

router.get('/', async (req, res) => {
    const cards = await service.about.fetchAll();
    req.ctx = { ...req.ctx, cards, title: 'About Us' };
    return res.render('pages/about', req.ctx)
});

export default router;