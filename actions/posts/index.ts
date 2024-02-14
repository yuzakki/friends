'use server';

import { z } from 'zod';
import { connectToDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { Types } from 'mongoose';

import { PostSchema } from '@/schemas';
import { currentUser } from '@/actions/auth/current-user';
import { IPost, PostModel } from '@/models/postModel';
import { IUser, UserModel } from '@/models/userModel';

// GOOD

export async function createPost(data: z.infer<typeof PostSchema>) {
  connectToDb();

  const { user } = await currentUser();

  const modifiedData = {
    ...data,
    author: user?._id,
    username: user?.username,
    likes: [],
  };

  await PostModel.create(modifiedData);

  revalidatePath('/');
  revalidatePath('/profile');
  return { success: 'Post created!' };
}

export async function editPost(
  postId: string,
  newData: z.infer<typeof PostSchema>
) {
  connectToDb();

  const existingPost: IPost | null | undefined = await PostModel.findById(
    postId
  );

  if (!existingPost) {
    return { error: 'Post not found' };
  }

  const { user } = await currentUser();

  if (existingPost.author.toString() !== user?._id.toString()) {
    return { error: 'You are not authorized to edit this post' };
  }

  Object.assign(existingPost, newData);

  await existingPost.save();

  revalidatePath('/');
  revalidatePath('/profile');

  return { success: 'Post edited!' };
}

// #################################################################

export async function getAllPosts() {
  connectToDb();

  const posts: IPost[] | null = await PostModel.find({
    privacy: 'public',
  })
    .sort({ updatedAt: -1 })
    .populate({
      path: 'author',
      model: UserModel,
    });

  const plainObject: IPost[] = JSON.parse(JSON.stringify(posts));

  return { posts: plainObject };
}

export async function getMyPosts() {
  connectToDb();

  const { user } = await currentUser();

  const posts: IPost[] | null = await PostModel.find({
    author: user?._id,
  })
    .sort({ updatedAt: -1 })
    .populate({
      path: 'author',
      model: UserModel,
    });

  const plainObject: IPost[] | null = JSON.parse(JSON.stringify(posts));

  return { posts: plainObject };
}

export async function getPostByUsername(username: string) {
  connectToDb();

  const posts: IPost[] | null = await PostModel.find({
    privacy: 'public',
    username,
  })
    .sort({ updatedAt: -1 })
    .populate({
      path: 'author',
      model: UserModel,
    });

  const plainObject: IPost[] | null = JSON.parse(JSON.stringify(posts));

  return { posts: plainObject };
}

export async function deletePost(id: any) {
  connectToDb();

  await PostModel.findByIdAndDelete(id);

  revalidatePath('/');
  revalidatePath('/profile');

  return { success: 'Post deleted!' };
}

// #################################################################
// #################################################################

interface PostInteracsProps {
  postId: Types.ObjectId;
  userId: Types.ObjectId | any;
}

export async function likePost({ postId, userId }: PostInteracsProps) {
  connectToDb();

  const post: IPost | null = await PostModel.findByIdAndUpdate(
    postId,
    { $push: { likes: userId } },
    { new: true }
  );

  if (!post) {
    return { error: 'Post not found!' };
  }

  revalidatePath('/');
  revalidatePath('/profile');
}

export async function dislikePost({ postId, userId }: PostInteracsProps) {
  connectToDb();

  const post: IPost | null = await PostModel.findByIdAndUpdate(
    postId,
    { $pull: { likes: userId } },
    { new: true }
  );

  if (!post) {
    return { error: 'Post not found' };
  }

  revalidatePath('/');
  revalidatePath('/profile');
}

export async function checkIfUserLikedPost({
  postId,
  userId,
}: PostInteracsProps) {
  connectToDb();

  const post: IPost | null = await PostModel.findById(postId);

  const userLikedPost = post?.likes && post.likes.includes(userId);

  return userLikedPost || false;
}

export async function getLikesCount(postId: string) {
  const post: IPost | null = await PostModel.findById(postId);

  if (!post) {
    return 0;
  }

  const likesCount = post.likes.length;
  return likesCount;
}

export async function getLikedUsers(postId: string) {
  const post = (await PostModel.findById(postId).populate(
    'likes'
  )) as IPost | null;

  if (!post) {
    return [];
  }

  const likedUsers = post.likes.map((userId) => userId.toString());
  return likedUsers;
}
