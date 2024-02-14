'use client';

import { FaUser } from 'react-icons/fa';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { CreatePostForm } from './create-post-form';

export function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center xm:gap-3 gap-2 border border-border shadow-md rounded-lg px-4 py-6 bg-white">
      <div className="bg-slate-200 p-2.5 rounded-full">
        <FaUser size={22} />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="placeholder">Create a post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <CreatePostForm setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
