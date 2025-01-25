import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { IBlog } from './blog.interface';
import Blog from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';
import unlinkFile from '../../helper/unLinkFile';

const createBlog = async (payload: IBlog) => {
  const result = await Blog.create(payload);
  return result;
};

const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (payload.blog_image) {
    unlinkFile(payload.blog_image);
  }
  return result;
};

const getAllBlog = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(['description', 'hashtag'])
    .fields()
    .filter()
    .paginate()
    .sort();

  const result = await blogQuery.modelQuery;
  const meta = await blogQuery.countTotal();
  return {
    meta,
    result,
  };
};
const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const deleteSingleBlog = async (id: string) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  const result = await Blog.findByIdAndDelete(id);
  if (blog.blog_image) {
    unlinkFile(blog.blog_image);
  }
  return result;
};

const BlogService = {
  createBlog,
  updateBlog,
  getAllBlog,
  getSingleBlog,
  deleteSingleBlog,
};

export default BlogService;
