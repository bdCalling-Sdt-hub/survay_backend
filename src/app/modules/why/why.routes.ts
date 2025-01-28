import express from 'express';
import WhyController from './why.controller';

const router = express.Router();

router.post('/generate-why-overview', WhyController.generateWhyOverview);

export const whyRoutes = router;
