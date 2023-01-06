import express from 'express';
import subscriptionApi from './subscription';
import userApi from './user';
import commentApi from './comment';
import reactionApi from './reaction';

const router = express.Router();

router.use('/subscription', subscriptionApi);
router.use('/users', userApi);
router.use('/comments', commentApi);
router.use('/reaction', reactionApi)

export default router;