import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  imageUrl: any;
  altText: any;
  classes?: string;
  imgClasses?: string;
}

export function PostImage({ imageUrl, altText, classes, imgClasses }: Props) {
  return imageUrl ? (
    // border-y border-gray-200
    <div
      className={cn(
        'max-w-full pb-1.5 overflow-hidden relative max-h-[500px] bg-black mb-1.5',
        classes
      )}
    >
      <Image
        src={imageUrl}
        alt={altText}
        height={500}
        width={500}
        objectFit="cover"
        className={cn('mx-auto', imgClasses)}
      />
    </div>
  ) : null;
}
