import express from 'express';
const router = express.Router();

router.post('/1', async (req, res, next) => {
    await new Promise(r=> setTimeout(r, 2000));
    // req.ctx.user.subscribed = true;
    if (!req.ctx.user.subscribed) {
        // req.ctx.error = { subscription: 'error' };
        // res.render('partials/modal/500', req.ctx);
        next(new Error('error'));
    } else {
        res.render('partials/success/subscription');
    }
});

router.post('/2', async (req, res, next) => {
    await new Promise(r => setTimeout(r, 2000));
    req.ctx.user.subscribed = true;
    if (!req.ctx.user.subscribed) {
        res.status(500).json({ success: false });
    } else {
        res.json({ success: true });
    }
});

export default router;