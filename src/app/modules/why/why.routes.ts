import express from 'express';
import WhyController from './why.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/generate-why-overview',
  auth(USER_ROLE.user),
  WhyController.generateWhyOverview,
);
router.get(
  '/get-single-why/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.user),
  WhyController.getSingleWhy,
);
router.get('/get-all-why', auth(USER_ROLE.superAdmin), WhyController.getAllWhy);
router.get('/get-my-why', auth(USER_ROLE.user), WhyController.getMyWhy);
router.delete('/delete-why/:id', auth(USER_ROLE.user), WhyController.deleteWhy);

export const whyRoutes = router;
