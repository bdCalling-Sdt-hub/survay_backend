import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import WhyService from './why.service';

const generateWhyOverview = catchAsync(async (req, res) => {
  const result = await WhyService.generateWhyOverview(
    req.user.profileId,
    req.body.questionAnswer,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Why overview generated successfully',
    data: result,
  });
});
const getAllWhy = catchAsync(async (req, res) => {
  const result = await WhyService.getAllWhy(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Why retrieved successfully',
    data: result,
  });
});
const getMyWhy = catchAsync(async (req, res) => {
  const result = await WhyService.getMyWhy(req.user.profileId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Why retrieved successfully',
    data: result,
  });
});
const deleteWhy = catchAsync(async (req, res) => {
  const result = await WhyService.deleteWhy(req.user.profileId, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Why deleted successfully',
    data: result,
  });
});

const WhyController = {
  generateWhyOverview,
  getAllWhy,
  getMyWhy,
  deleteWhy,
};

export default WhyController;
