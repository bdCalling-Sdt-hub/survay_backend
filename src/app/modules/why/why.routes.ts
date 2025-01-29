import express from 'express';
import WhyController from './why.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/generate-why-overview', WhyController.generateWhyOverview);
router.get('/get-all-why', auth(USER_ROLE.superAdmin), WhyController.getAllWhy);
export const whyRoutes = router;
