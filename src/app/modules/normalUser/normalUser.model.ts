import { model, Schema } from 'mongoose';
import { INormalUser } from './normalUser.interface';

const NormalUserSchema = new Schema<INormalUser>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      // required: true,
      // unique: true,
    },
    profession: {
      type: String,
    },
    education: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
    },
    profile_image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);
const NormalUser = model<INormalUser>('NormalUser', NormalUserSchema);

export default NormalUser;
