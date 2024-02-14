import clsx from 'clsx';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export function ForgotPasswordBtn() {
  return (
    <span className="block text-slate-600 text-end">
      <Link
        href="/auth/forgot-password"
        className="text-[15px] font-medium hover:underline"
      >
        Forgot password?
      </Link>
    </span>
  );
}

export function DontHaveAcc() {
  return (
    <span className="block mt-8 text-sm text-center text-black md:text-base">
      Don&apos;t have an account yet?{' '}
      <Link href="/auth/signup" className="font-bold hover:underline">
        Sign Up
      </Link>
    </span>
  );
}

export function AlreadyHaveAcc({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        'block mt-8 text-sm text-center text-black md:text-base',
        className
      )}
    >
      Already have an account?{' '}
      <Link href="/auth/login" className="font-bold hover:underline">
        Login
      </Link>
    </span>
  );
}

// export const Social = () => {
//   const onClick = (provider: 'google' | 'github') => {
//     signIn("google", {
//       callbackUrl: DEFAULT_LOGIN_REDIRECT,
//     });
//   };

//   return (
//     <div className="flex items-center w-full gap-x-2">
//       <Button
//         size="sm"
//         className="w-full"
//         variant="outline"
//         onClick={() => onClick('google')}
//       >
//         <FcGoogle className="h-5 w-5" />
//       </Button>
//       <Button
//         size="sm"
//         className="w-full"
//         variant="outline"
//         onClick={() => onClick('github')}
//       >
//         <FaGithub className="h-5 w-5" />
//       </Button>
//     </div>
//   );
// };
