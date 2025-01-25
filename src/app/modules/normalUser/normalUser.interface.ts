/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';

export interface INormalUser {
  user: Types.ObjectId;
  name: string;
  profession: string;
  dateOfBirth: string;
  education: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  profile_image: string;
}
