import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function UnAuthenticated() {
  return (
    <>
      <Button variant="outline" asChild className="hidden xxs:inline-flex">
        <Link prefetch href="/auth/login">
          Login
        </Link>
      </Button>

      <Button asChild>
        <Link prefetch href="/auth/signup">
          Sign Up
        </Link>
      </Button>
    </>
  );
}
