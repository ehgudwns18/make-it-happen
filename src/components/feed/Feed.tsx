import { PostCard } from "./PostCard";
import { usePostContext } from "@/context/PostContext";

export function Feed() {
  const { posts } = usePostContext();

  return (
    <div className="pb-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
