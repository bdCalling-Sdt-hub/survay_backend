import httpStatus from 'http-status';
import AppError from '../../error/appError';
import QueryBuilder from '../../builder/QueryBuilder';
import unlinkFile from '../../helper/unLinkFile';
import { IStory } from './story.interface';
import Story from './story.model';
import { ENUM_STORY_STATUS } from '../../utilities/enum';
import NormalUser from '../normalUser/normalUser.model';
import sendEmail from '../../utilities/sendEmail';
import config from '../../config';

const createStory = async (profileId: string, payload: IStory) => {
  const result = await Story.create({ ...payload, author: profileId });

  return result;
};

const updateStory = async (
  profileId: string,
  id: string,
  payload: Partial<IStory>,
) => {
  const story = await Story.findOne({ _id: id, author: profileId });
  if (!story) {
    throw new AppError(httpStatus.NOT_FOUND, 'Story not found');
  }
  const result = await Story.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (story.story_image) {
    unlinkFile(story.story_image);
  }
  return result;
};

const getAllStory = async (query: Record<string, unknown>) => {
  const storyQuery = new QueryBuilder(
    Story.find().populate({ path: 'author', select: 'name profile_image' }),
    query,
  )
    .search(['title', 'description'])
    .fields()
    .filter()
    .paginate()
    .sort();

  const result = await storyQuery.modelQuery;
  const meta = await storyQuery.countTotal();
  return {
    meta,
    result,
  };
};
const getSingleStory = async (id: string) => {
  const result = await Story.findById(id).populate({
    path: 'author',
    select: 'name profile_image',
  });
  return result;
};

const deleteSingleStory = async (profileId: string, id: string) => {
  const story = await Story.findOne({ _id: id });
  if (!story) {
    throw new AppError(httpStatus.NOT_FOUND, 'Story not found');
  }
  const result = await Story.findByIdAndDelete(id);
  if (story.story_image) {
    unlinkFile(story.story_image);
  }
  return result;
};

const approveStory = async (id: string) => {
  const story = await Story.findById(id);
  if (!story) {
    throw new AppError(httpStatus.NOT_FOUND, 'Story not found');
  }
  const result = await Story.findByIdAndUpdate(
    id,
    { status: ENUM_STORY_STATUS.APPROVED },
    { new: true, runValidators: true },
  );
  if (!result) {
    throw new AppError(httpStatus.CONFLICT, 'Story approved failed');
  }
  const normalUserSubscriptionEmails = await NormalUser.find({
    subscriptionEmail: { $ne: '' },
  });

  const emails = normalUserSubscriptionEmails.map(
    (user) => user.subscriptionEmail,
  );
  if (emails.length === 0) {
    console.log('No users found with subscription emails.');
    return;
  }

  // Email template
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #555;">📖 New Story Alert: ${result.title}</h2>
      <p>Hey there,</p>
      <p>A new story has just been shared, and we thought you might like it!</p>
      <blockquote style="border-left: 4px solid #ff6600; padding-left: 10px; color: #666;">
        "${result.title}..."
      </blockquote>
      <p>Click the button below to read the full story:</p>
      <a href="https://survey-zeta-tawny.vercel.app/client-why" target="_blank" style="display: inline-block; background-color: #ff6600; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px;">Read the Story</a>
      <p>If you don't want to receive these updates, you can <a href="#" style="color: #ff6600;">unsubscribe</a> anytime.</p>
      <p>Happy reading!<br><strong>Find your why</strong></p>
    </div>
  `;

  // Sending ONE email to ALL recipients using BCC
  await sendEmail({
    email: config.smtp.smtp_mail as string,
    subject: `📢 New Story: ${result.title}`,
    html: emailHtml,
    bcc: emails.join(','),
  });
  return result;
};

const StoryService = {
  createStory,
  updateStory,
  getAllStory,
  getSingleStory,
  deleteSingleStory,
  approveStory,
};

export default StoryService;
