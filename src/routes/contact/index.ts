import express, { NextFunction, Response } from 'express';
import { Request } from '../../interfaces/http.interface';
import utils from '../../utils';

const router = express.Router();

export const contactTitle = 'Contact Us';

router.get('/', (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, () => {
    return res.render('pages/contact', { ...req.ctx, title: contactTitle })
}));

export default router;