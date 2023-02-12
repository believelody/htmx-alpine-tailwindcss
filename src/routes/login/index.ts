import express, { NextFunction, Response } from 'express';
import { Request } from '../../interfaces/http.interface';
import utils from '../../utils';
const router = express.Router();

export const loginTitle = 'Login Page'

router.get('/', (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, () => {
    return res.render('pages/login', { ...req.ctx, title: loginTitle });
}));

export default router;