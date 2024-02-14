import { getPostByUsername } from '@/actions/posts';
import { getUserByUsername } from '@/actions/users';

import { PostCard } from '@/components/cards/post-card';

async function UserPage({ params }: { params: { username: string } }) {
  const { user } = await getUserByUsername(params.username);
  const { posts } = await getPostByUsername(params.username);

  return (
    <main className="max-w-[700px] mx-auto">
      {(!posts || posts?.length === 0) && (
        <div className="my-10 flex justify-center items-center">
          <span className="text-slate-400 italic text-sm">
            {user?.fullName || user?.username} hasn&apos;t posted anything yet
          </span>
        </div>
      )}

      {posts && (
        <section className="flex flex-col gap-4">
          {posts?.map((post, i) => (
            <PostCard post={post} key={i} />
          ))}
        </section>
      )}
    </main>
  );
}

export default UserPage;
