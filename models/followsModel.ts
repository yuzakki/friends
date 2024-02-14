import { Schema, model, models, Document } from 'mongoose';
import { IUser } from './userModel';

export interface IFollows extends Document {
  followerId: IUser | any;
  followeeId: IUser | any;
}

const followsSchema = new Schema<IFollows>({
  followerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  followeeId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const FollowModel =
  models.Follow || model<IFollows>('Follow', followsSchema);
