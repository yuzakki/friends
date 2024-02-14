import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  photo: string | undefined;
  classes?: string;
}

export function ProfileImage({ photo, classes }: Props) {
  return (
    <>
      {photo ? (
        <>
          <Image
            className={cn(
              'rounded-full border-4 border-white h-[200px] w-[200px] object-cover',
              classes
            )}
            src={photo}
            blurDataURL={photo}
            placeholder="blur"
            alt="profile image"
            sizes="200px, 200px"
            quality={100}
            priority
            fill
          />
        </>
      ) : (
        <Image
          className="rounded-full border-4 border-white h-[200px] w-[200px]"
          src="/assets/images/default-photo.jpg"
          alt="profile image"
          sizes="200px, 200px"
          // quality={100}
          priority
          fill
        />
      )}
    </>
  );
}
