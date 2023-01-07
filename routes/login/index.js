import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect("/");
    }
    req.ctx = { ...req.ctx, title: 'Login Page' }
    return res.render('pages/login', req.ctx)
});

export default router;