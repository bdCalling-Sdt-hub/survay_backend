import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { ManageRoutes } from '../modules/manage-web/manage.routes';
import { normalUserRoutes } from '../modules/normalUser/normalUser.routes';

import { notificationRoutes } from '../modules/notification/notification.routes';
import { blogRoutes } from '../modules/blog/blog.routes';
import { storyRoutes } from '../modules/story/story.routes';
import { metaRoutes } from '../modules/meta/meta.routes';
import { whyRoutes } from '../modules/why/why.routes';
import { superAdminRoutes } from '../modules/superAdmin/superAdmin.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    router: authRoutes,
  },
  {
    path: '/user',
    router: userRoutes,
  },
  {
    path: '/normal-user',
    router: normalUserRoutes,
  },
  {
    path: '/super-admin',
    router: superAdminRoutes,
  },

  {
    path: '/manage',
    router: ManageRoutes,
  },
  {
    path: '/notification',
    router: notificationRoutes,
  },
  {
    path: '/blog',
    router: blogRoutes,
  },
  {
    path: '/story',
    router: storyRoutes,
  },
  {
    path: '/meta',
    router: metaRoutes,
  },
  {
    path: '/why',
    router: whyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
