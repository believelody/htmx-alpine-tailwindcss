import express from 'express';
const router = express.Router();

router.post('/1', async (req, res, next) => {
    await new Promise(r=> setTimeout(r, 2000));
    // req.ctx.user.subscribed = true;
    if (!req.ctx.user.subscribed) {
        req.ctx.error = { subscription: 'An error has occured.' };
        req.ctx.form = req.body;
        res.render('partials/form/subscription', req.ctx);
        // next(new Error('error'));
    } else {
        res.render('partials/success/subscription');
    }
});

router.post('/2', async (req, res, next) => {
    await new Promise(r => setTimeout(r, 2000));
    req.ctx.user.subscribed = true;
    if (!req.ctx.user.subscribed) {
        res.status(500).json({ error: "An error has occured" });
    } else {
        res.json({ success: true });
    }
});

export default router;