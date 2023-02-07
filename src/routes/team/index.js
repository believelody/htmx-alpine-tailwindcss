import express from 'express';
import service from '../../services';
import utils from '../../utils';

const router = express.Router();

router.get('/', (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
    req.ctx = { ...req.ctx, title: 'Our Team' }
    const teams = await service.team.fetchAll();
    req.ctx.teams = teams;
    return res.render('pages/team', req.ctx)
}));

export default router;