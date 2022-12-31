import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
    await new Promise(r=> setTimeout(r, 2000));
    console.log(req.body);
    res.render('partials/success/subscription', { layout: false });
});

export default router;