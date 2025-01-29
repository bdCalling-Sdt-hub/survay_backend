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

const WhyController = {
  generateWhyOverview,
  getAllWhy,
};

export default WhyController;
