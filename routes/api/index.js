import express from 'express';
import subscriptionApi from './subscription';
import userApi from './user';
import commentApi from './comment';

const router = express.Router();

router.use('/subscription', subscriptionApi);
router.use('/users', userApi);
router.use('/comments', commentApi);

export default router;