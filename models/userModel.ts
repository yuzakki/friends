import { Schema, model, models, Document, Model } from 'mongoose';

import bcrypt from 'bcrypt';
import crypto from 'crypto';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;

  firstName: string;
  lastName: string;
  fullName: string;
  photo: string;
  cover: string;
  gender: 'male' | 'female' | 'unspecified';
  birthday: Date;
  bio: string;
  dateJoined: Date;

  passwordChangedAt: Date;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | undefined;

  // methods
  correctPassword(x: string, y: string): Promise<boolean>;
  changedPasswordAfter(x: number): boolean;
  createPasswordResetToken(): string;
}

const genderEnum = ['male', 'female', 'unspecified'];

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  firstName: String,
  lastName: String,
  fullName: String,

  photo: String,
  cover: String,

  gender: {
    type: String,
    enum: genderEnum,
    default: 'unspecified',
  },
  birthday: {
    type: Date,
  },
  bio: {
    type: String,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Hash user's password before save
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre<IUser>('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = new Date(Date.now() - 1000);

  next();
});

// Methods
// 1)
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// 2)
userSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// 3)
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min

  return resetToken;
};

export const UserModel: Model<IUser> =
  models.User || model<IUser>('User', userSchema);
