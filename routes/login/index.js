import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    req.ctx = { ...req.ctx, title: 'Login Page' }
    return res.render('pages/login', req.ctx)
});

export default router;