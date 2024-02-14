import { CheckIsAuth } from '@/data/check-is-auth';

import Logo from '@/components/logo';
import { Authenticated } from './authenticated';
import { UnAuthenticated } from './unAuthenticated';

export async function NavBar() {
  const { isAuthenticated, user } = await CheckIsAuth();

  return (
    <nav className="flex-between py-4 bg-white main-container shadow-sm z-50">
      <Logo textClasses="" />

      <div className="flex-between gap-3">
        {!isAuthenticated && <UnAuthenticated />}
        {isAuthenticated && <Authenticated user={user} />}
      </div>
    </nav>
  );
}
