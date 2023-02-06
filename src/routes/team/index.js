import express from 'express';
import service from '../../services';

const router = express.Router();

router.get('/', async (req, res) => {
    req.ctx = { ...req.ctx, title: 'Our Team' }
    const teams = await service.team.fetchAll();
    req.ctx.teams = teams;
    return res.render('pages/team', req.ctx)
});

export default router;