import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { uploadFile } from '../../helper/fileUploader';
import validateRequest from '../../middlewares/validateRequest';
import StoryController from './story.controller';
import storyValidations from './story.validation';

const router = express.Router();

router.post(
  '/create-story',
  auth(USER_ROLE.user),
  uploadFile(),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(storyValidations.createStoryValidationSchema),
  StoryController.createStory,
);
router.patch(
  '/update-story',
  auth(USER_ROLE.user),
  validateRequest(storyValidations.updateStoryValidationSchema),
  StoryController.updateStory,
);
router.get('/all-story', StoryController.getAllStory);
router.post('/single-story', StoryController.getSingleStory);
router.delete(
  '/delete-story/:id',
  auth(USER_ROLE.user, USER_ROLE.superAdmin),
  StoryController.deleteSingleStory,
);

router.patch(
  '/approve-story/:id',
  auth(USER_ROLE.superAdmin),
  StoryController.approveStory,
);

export const storyRoutes = router;
