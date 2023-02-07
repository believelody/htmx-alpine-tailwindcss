import express from 'express';
import utils from '../../../utils';

const router = express.Router();

router.post('/1', (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
    await new Promise(r => setTimeout(r, 2000));
    // throw new Error('');
    // req.ctx.user.subscribed = true;
    if (!req.ctx.user?.subscribed) {
        res.status(400).send({ subscription: 'Your email already exists. Try something else or contact us for more help.' });
    }
    else {
        res.render('partials/success/subscription');
    }
}));

router.post('/2', (req, res, next) => utils.error.handleHttpError(req, res, next, async () => {
    await new Promise(r => setTimeout(r, 2000));
    req.ctx.user.subscribed = true;
    if (!req.ctx.user.subscribed) {
        res.status(500).json({ error: "An error has occured" });
    } else {
        res.json({ success: true });
    }
}));

export default router;