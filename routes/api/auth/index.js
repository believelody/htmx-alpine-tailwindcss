import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await new Promise(r => setTimeout(r, 3000));
    const loginRes = await fetch(`${process.env.DUMMY_DATA_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
      // body: JSON.stringify({
        // username: 'kminchelle',
        // password: '0lelplR',
        // expiresInMins: 60, // optional
      // })
    });
    const loginJson = await loginRes.json();
    if (loginJson.message) {
      req.ctx = { ...req.ctx, error: loginJson.message };
      return res.status(404).send({ login: loginJson.message });
    }
    // req.ctx = { ...req.ctx, post, liked: true, title: post.title };
    res.setHeader('HX-Trigger', 'auth-success');
    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;