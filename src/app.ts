/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
const app: Application = express();
import sendContactUsEmail from './app/helper/sendContactUsEmail';
import auth from './app/middlewares/auth';
import { USER_ROLE } from './app/modules/user/user.constant';
import sendAnnounsment from './app/helper/sendAnnounsment';
// parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
      'http://localhost:3005',
      'http://localhost:3006',
      'http://localhost:3007',
      'http://localhost:3008',
      'http://10.0.60.24:3002',
      'http://10.0.60.24:3002',
      'http://10.0.60.24:7585',
      'http://209.97.150.2:3000',
      'http://209.97.150.2:4173',
    ],
    credentials: true,
  }),
);
app.use('/uploads', express.static('uploads'));
// application routers ----------------
app.use('/', router);
app.post('/contact-us', sendContactUsEmail);
app.post('/send-annousment', auth(USER_ROLE.superAdmin), sendAnnounsment);
app.get('/nice', async (req, res) => {
  res.send({ message: 'nice to meet you' });
});

// global error handler
app.use(globalErrorHandler);
// not found
app.use(notFound);

export default app;
