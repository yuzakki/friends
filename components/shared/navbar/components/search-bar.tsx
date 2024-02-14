'use client';

import clsx from 'clsx';
import { IoIosSearch } from 'react-icons/io';
import { useMedia } from 'use-media';
import Logo from '@/components/logo';
import { Input } from '@/components/ui/input';
import { ShowIcon } from '@/components/show-icon';
import { HiArrowSmLeft } from 'react-icons/hi';

// Not being used for the moment

export function SearchBar({
  isOpen,
  toggleSearch,
}: {
  isOpen: boolean;
  toggleSearch: () => void;
}) {
  return (
    <div className="flex items-center sm:gap-5">
      {!isOpen && <Logo />}

      {isOpen && (
        <ShowIcon
          onClick={toggleSearch}
          className="bg-transparent hover:!bg-slate-200 cursor-pointer text-muted-foreground mr-1"
        >
          <HiArrowSmLeft size={20} />
        </ShowIcon>
      )}
      <SearchInput isOpen={isOpen} toggleSearch={toggleSearch} />
    </div>
  );
}

function SearchInput({
  isOpen,
  toggleSearch,
}: {
  isOpen: boolean;
  toggleSearch: () => void;
}) {
  const isMobile = useMedia({ maxWidth: '640px' });

  return (
    <div className="relative">
      {!isOpen && (
        <ShowIcon
          onClick={isMobile ? toggleSearch : undefined}
          keepClasses={isMobile ? true : false}
          hoverEffect={isMobile ? true : false}
          className={clsx(
            'absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground'
          )}
        >
          <IoIosSearch size={20} />
        </ShowIcon>
      )}

      <Input
        type="text"
        placeholder="Search"
        className={clsx(
          'rounded-full sm:pl-9 pl-4 max-w-60 hidden sm:flex',
          isOpen && '!flex'
        )}
      />
    </div>
  );
}
