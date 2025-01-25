import mongoose, { Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  hashtag: { type: String, required: true, trim: true },
  blog_image: { type: String, required: true },
  description: { type: String, required: true, trim: true },
});

// Create and export the Blog model
const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
