import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import StoryService from './story.service';

const createStory = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'story_image' in files) {
    req.body.story_image = files['story_image'][0].path;
  }
  const result = await StoryService.createStory(req.user.profileId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Story created successfully',
    data: result,
  });
});
const getAllStory = catchAsync(async (req, res) => {
  const result = await StoryService.getAllStory(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Story retrieved successfully',
    data: result,
  });
});
const getSingleStory = catchAsync(async (req, res) => {
  const result = await StoryService.getSingleStory(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Story retrieved successfully',
    data: result,
  });
});
const updateStory = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'story_image' in files) {
    req.body.story_image = files['story_image'][0].path;
  }
  const result = await StoryService.updateStory(
    req.user.profileId,
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Story updated successfully',
    data: result,
  });
});
const deleteSingleStory = catchAsync(async (req, res) => {
  const result = await StoryService.deleteSingleStory(
    req.user.profileId,
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Story deleted successfully',
    data: result,
  });
});

const StoryController = {
  createStory,
  getAllStory,
  getSingleStory,
  updateStory,
  deleteSingleStory,
};

export default StoryController;
