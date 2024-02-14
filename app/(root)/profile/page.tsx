import { getMyPosts } from '@/actions/posts';
import { PostCard } from '@/components/cards/post-card';

import { CreatePost } from '@/components/forms/create-post';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const { posts } = await getMyPosts();

  return (
    <main className="max-w-[700px] mx-auto">
      <CreatePost />

      {(!posts || posts.length === 0) && (
        <div className="my-10 flex justify-center items-center">
          <span className="text-slate-400 italic">
            You haven&apos;t posted anything yet
          </span>
        </div>
      )}

      {posts && (
        <section className="flex flex-col gap-4 mt-4">
          {posts?.map((post, i) => (
            <PostCard post={post} key={i} />
          ))}
        </section>
      )}
    </main>
  );
}
