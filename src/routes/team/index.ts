import express from 'express';
import { Request } from '../../interfaces/http.interface';
import { Team } from '../../interfaces/team.interface';
import service from '../../services';
import utils from '../../utils';

const router = express.Router();

const teamsTitle = "Our Team"

router.get('/', (req: Request, res: Response, next) => utils.error.handleHttpError(req, next, async () => {
    const teams = await service.team.fetchAll() as Team[];
    return res.render("pages/team", { ...req.ctx, teams, title: teamsTitle });
}));

export default router;