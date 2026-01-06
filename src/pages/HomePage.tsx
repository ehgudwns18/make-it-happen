import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { StoriesRow } from "@/components/stories/StoriesRow";
import { Feed } from "@/components/feed/Feed";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14 pb-16">
        <StoriesRow />
        <Feed />
      </main>
      <BottomNav />
    </div>
  );
}
