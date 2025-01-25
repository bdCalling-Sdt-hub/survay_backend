import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import BlogService from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'blog_image' in files) {
    req.body.blog_image = files['blog_image'][0].path;
  }
  const result = await BlogService.createBlog(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});
const getAllBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlog(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrieved successfully',
    data: result,
  });
});
const getSingleBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getSingleBlog(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog retrieved successfully',
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const { files } = req;
  if (files && typeof files === 'object' && 'blog_image' in files) {
    req.body.blog_image = files['blog_image'][0].path;
  }
  const result = await BlogService.updateBlog(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});
const deleteSingleBlog = catchAsync(async (req, res) => {
  const result = await BlogService.deleteSingleBlog(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

const BlogController = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteSingleBlog,
};

export default BlogController;
