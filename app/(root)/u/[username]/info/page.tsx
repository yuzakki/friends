import { getUserByUsername } from '@/actions/users';

import { UserInfoHeader } from '@/components/pages/user/info/components/user-info-header';
import { UserInfo } from '@/components/pages/user/info/components/user-info-section';

async function InfoPage({ params }: { params: { username: string } }) {
  const { user } = await getUserByUsername(params.username);

  return (
    <main>
      <div className="bg-white px-5 py-5 shadow-md rounded-lg">
        <UserInfoHeader />
        <UserInfo user={user} />
      </div>
    </main>
  );
}

export default InfoPage;
