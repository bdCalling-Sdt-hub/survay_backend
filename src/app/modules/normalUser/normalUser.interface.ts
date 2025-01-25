/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';

export interface INormalUser {
  inviteToken: any;
  user: Types.ObjectId;
  name: string;
  profession: string;
  dateOfBirth: string;
  education: string;
  username: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  profile_image: string;
}
