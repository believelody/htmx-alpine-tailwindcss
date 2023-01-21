import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('pages/login', { ...req.ctx, title: 'Login Page' });
});

export default router;