import express, { NextFunction, Response } from 'express';
import { Request } from '../../../interfaces/http.interface';
import utils from '../../../utils';

const router = express.Router();

router.post('/1', (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
    await new Promise(r => setTimeout(r, 2000));
    // throw new Error('');
    const user = req.ctx?.user;
    if (user?.subscribed) {
        res.status(400).send({ subscription: 'Your email already exists. Try something else or contact us for more help.' });
    }
    else if (user) {
        user.subscribed = true;
        if (req.session) {
            req.session.user = user;
        }
    }
    return res.render("partials/success/subscription", { ...req.ctx, user });
}));

router.post('/2', (req: Request, res: Response, next: NextFunction) => utils.error.handleHttpError(req, next, async () => {
    await new Promise(r => setTimeout(r, 2000));
    const user = req.ctx?.user;
    if (user?.subscribed) {
        res.status(400).json({ subscription: 'Your email already exists. Try something else or contact us for more help.' });
    } else if (user) {
        if (req.session) {
            req.session.user = { ...user, subscribed: true };
        }
    }
    return res.json({ success: true });
}));

export default router;