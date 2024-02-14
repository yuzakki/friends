'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdPublic } from 'react-icons/md';
import { FaLock, FaTrash } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { HiPencil } from 'react-icons/hi2';
import toast from 'react-hot-toast';

import { deletePost } from '@/actions/posts';
import { IUser } from '@/models/userModel';
import { IPost } from '@/models/postModel';
import { PostFormattedDate } from '@/lib/helpers';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { EditPostForm } from '@/components/forms/edit-post/edit-post-form';
import { cn } from '@/lib/utils';

interface Props {
  currentUser: IUser | null | undefined;
  post: IPost;
  classes?: string;
}

export function PostHeader({ post, currentUser, classes }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  async function DeletePost(id: any) {
    if (currentUser && currentUser._id === post.author._id) {
      const creatingPostToast = toast.loading('Deleting post...');

      await deletePost(id)
        .then(() =>
          toast.success('Post deleted!', {
            id: creatingPostToast,
          })
        )
        .catch(() => toast.error('Failed to create post'));
    } else {
      toast.error('You can only delete your own posts.');
    }
  }

  const fullNameOrUsername = post?.author?.fullName || post?.author?.username;

  return (
    <div className={cn('author flex-between gap-3 px-4', classes)}>
      <div className="flex items-center gap-3">
        <Link href={`/u/${post?.author?.username}`}>
          <Image
            className="rounded-full h-11 w-11 object-cover border border-gray-200 cursor-pointer"
            src={post?.author?.photo || '/assets/images/default-photo.jpg'}
            alt="profile image"
            width={200}
            height={200}
            priority
          />
        </Link>

        <div className="flex flex-col justify-evenly">
          <Link
            href={`/u/${post?.author?.username}`}
            className="font-medium hover:underline underline-offset-2 w-fit"
          >
            {fullNameOrUsername}
          </Link>

          <span className="text-gray-500 text-xs flex gap-2 items-center">
            {PostFormattedDate(post?.updatedAt)}
            {post?.privacy === 'public' ? <MdPublic /> : <FaLock size={12} />}
          </span>
        </div>
      </div>

      <div>
        {currentUser && currentUser._id === post.author._id && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="threeDots" size="xs">
                  <BsThreeDots size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64 mt-1" align="end">
                <DialogTrigger className="w-full">
                  <DropdownMenuItem>
                    <HiPencil className="mr-3 h-4 w-4" />
                    <span>Edit post</span>
                  </DropdownMenuItem>
                </DialogTrigger>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => DeletePost(post?._id)}>
                  <FaTrash className="mr-3 h-4 w-4" />
                  <span>Move to trash</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent>
              <EditPostForm prevPost={post} setIsOpen={setIsOpen} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
