import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import BlogController from './blog.controller';
import { uploadFile } from '../../helper/fileUploader';
import validateRequest from '../../middlewares/validateRequest';
import blogValidations from './blog.validation';

const router = express.Router();

router.post(
  '/create-blog',
  auth(USER_ROLE.superAdmin),
  uploadFile(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  BlogController.createBlog,
);
router.patch(
  '/update-blog',
  auth(USER_ROLE.superAdmin),
  validateRequest(blogValidations.updateBlogValidationSchema),
  BlogController.updateBlog,
);
router.get('/all-blogs', BlogController.getAllBlog);
router.post('/single-blog', BlogController.getSingleBlog);
router.delete(
  '/delete-blog/:id',
  auth(USER_ROLE.superAdmin),
  BlogController.deleteSingleBlog,
);

export const blogRoutes = router;
