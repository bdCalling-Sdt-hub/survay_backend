import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import WhyService from './why.service';

const generateWhyOverview = catchAsync(async (req, res) => {
  const result = await WhyService.generateWhyOverview();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'why overview generated successfully',
    data: result,
  });
});

const WhyController = {
  generateWhyOverview,
};

export default WhyController;
