import { UserInfoHeader } from '@/components/pages/profile/info/components/user-info-header';
import { UserInfo } from '@/components/pages/profile/info/components/user-info';

export default function InfoPage() {
  return (
    <main>
      <div className="bg-white px-5 py-5 shadow-md rounded-lg">
        <UserInfoHeader />
        <UserInfo />
      </div>
    </main>
  );
}
