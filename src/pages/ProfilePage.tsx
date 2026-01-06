import { useState } from "react";
import { Settings, Grid3X3, Film, Bookmark, Menu, BadgeCheck } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { currentUser } from "@/data/mockData";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "posts", icon: Grid3X3 },
  { id: "reels", icon: Film },
  { id: "saved", icon: Bookmark },
];

const userPosts = [
  "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=300&fit=crop",
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");

  const formatCount = (count: number) => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}만`;
    }
    return count.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container max-w-lg mx-auto">
          <div className="flex items-center justify-between h-14 px-4">
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-bold">{currentUser.username}</h1>
              {currentUser.isVerified && (
                <BadgeCheck className="w-5 h-5 text-primary fill-primary" />
              )}
            </div>
            <div className="flex items-center gap-4">
              <button aria-label="새 게시물">
                <Settings className="w-6 h-6" />
              </button>
              <button aria-label="메뉴">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-14 pb-16">
        {/* Profile Info */}
        <div className="px-4 py-4">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="story-ring w-20 h-20">
              <div className="bg-background rounded-full p-[2px] w-full h-full">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 flex justify-around pt-2">
              <div className="text-center">
                <p className="font-bold text-lg">{currentUser.posts}</p>
                <p className="text-sm text-muted-foreground">게시물</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{formatCount(currentUser.followers)}</p>
                <p className="text-sm text-muted-foreground">팔로워</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{formatCount(currentUser.following)}</p>
                <p className="text-sm text-muted-foreground">팔로잉</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4">
            <p className="font-semibold">{currentUser.name}</p>
            <p className="text-sm whitespace-pre-line">{currentUser.bio}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 py-2 bg-secondary text-secondary-foreground font-semibold text-sm rounded-lg hover:bg-secondary/80 transition-colors">
              프로필 편집
            </button>
            <button className="flex-1 py-2 bg-secondary text-secondary-foreground font-semibold text-sm rounded-lg hover:bg-secondary/80 transition-colors">
              프로필 공유
            </button>
          </div>
        </div>

        {/* Story Highlights */}
        <div className="px-4 py-2 overflow-x-auto hide-scrollbar">
          <div className="flex gap-4">
            {["여행", "맛집", "일상", "운동"].map((highlight) => (
              <button key={highlight} className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full border-2 border-border flex items-center justify-center bg-secondary">
                  <span className="text-2xl">✨</span>
                </div>
                <span className="text-xs">{highlight}</span>
              </button>
            ))}
            <button className="flex flex-col items-center gap-1">
              <div className="w-16 h-16 rounded-full border-2 border-border flex items-center justify-center">
                <span className="text-2xl">+</span>
              </div>
              <span className="text-xs">새로 만들기</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-border mt-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 py-3 flex justify-center border-t-2 -mt-[2px] transition-colors",
                  activeTab === tab.id
                    ? "border-foreground"
                    : "border-transparent text-muted-foreground"
                )}
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-[2px]">
          {userPosts.map((image, index) => (
            <button key={index} className="aspect-square bg-muted">
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
