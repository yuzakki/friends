import { detectLanguage } from '@/lib/helpers';
import { cn } from '@/lib/utils';

interface Props {
  content: any;
  classes?: string;
}

export function PostContent({ content, classes }: Props) {
  const language = detectLanguage(content);
  const isArabic = language === 'arb';

  return (
    <div className={cn('pt-4 mb-3 px-4', classes)}>
      <div className="w-full laptop:max-w-[32rem] mlg:max-w-full">
        <div
          className="w-full md:text-base text-[15px]"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
