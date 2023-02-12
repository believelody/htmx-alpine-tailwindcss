import express, { NextFunction, Response } from 'express';
import { Request } from '../../interfaces/http.interface';
import utils from '../../utils';
const router = express.Router();

export const homeTitle = 'HTMX, Alpine JS & Tailwindcss';

router.get('/', (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, () => {
    return res.render('pages/home', { ...req.ctx, title: homeTitle });
}));

export default router;