import express from 'express';
const router = express.Router();

export const contactTitle = 'Contact Us';

router.get('/', (req, res) => {
    return res.render('pages/contact', { ...req.ctx, title: contactTitle })
});

export default router;