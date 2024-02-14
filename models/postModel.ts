import { Schema, model, models, Document, Types } from 'mongoose';
import { IUser } from './userModel';

export interface IPost extends Document {
  privacy: 'public' | 'onlyme';
  content: string;
  image: string;
  author: IUser | any;
  username: string;
  createdAt: Date;
  updatedAt: Date;

  likes: Types.ObjectId[] | IUser[];
}

const privacyEnum = ['public', 'onlyme'];

const postSchema = new Schema<IPost>({
  privacy: {
    type: String,
    enum: privacyEnum,
    default: 'public',
  },
  content: {
    type: String,
    required: true,
  },
  image: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

postSchema.pre('save', function (next) {
  this.updatedAt = new Date();

  if (
    this.isModified('content') ||
    this.isModified('privacy') ||
    this.isModified('image')
  ) {
    this.updatedAt = new Date();
  }

  next();
});

export const PostModel = models.Post || model<IPost>('Post', postSchema);
