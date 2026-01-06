import { useState } from "react";
import { Heart, MessageCircle, Send, MoreHorizontal, Music2, BadgeCheck, Bookmark } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { reels } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function ReelsPage() {
  const [currentReel, setCurrentReel] = useState(0);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set(["r2"]));

  const reel = reels[currentReel];

  const toggleLike = (reelId: string) => {
    setLikedReels((prev) => {
      const next = new Set(prev);
      if (next.has(reelId)) {
        next.delete(reelId);
      } else {
        next.add(reelId);
      }
      return next;
    });
  };

  const formatCount = (count: number) => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}만`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}천`;
    }
    return count.toString();
  };

  const handleSwipe = (direction: "up" | "down") => {
    if (direction === "up" && currentReel < reels.length - 1) {
      setCurrentReel((prev) => prev + 1);
    } else if (direction === "down" && currentReel > 0) {
      setCurrentReel((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4">
        <h1 className="text-xl font-bold text-white">릴스</h1>
      </header>

      {/* Reel Content */}
      <div
        className="h-screen relative"
        onTouchStart={(e) => {
          const startY = e.touches[0].clientY;
          const handleTouchEnd = (e: TouchEvent) => {
            const endY = e.changedTouches[0].clientY;
            const diff = startY - endY;
            if (Math.abs(diff) > 50) {
              handleSwipe(diff > 0 ? "up" : "down");
            }
            document.removeEventListener("touchend", handleTouchEnd);
          };
          document.addEventListener("touchend", handleTouchEnd);
        }}
      >
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <img
            src={reel.thumbnailUrl}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex">
          {/* Left side - Info */}
          <div className="flex-1 flex flex-col justify-end p-4 pb-24">
            {/* User info */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={reel.user.avatar}
                  alt={reel.user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-semibold text-sm flex items-center gap-1">
                {reel.user.username}
                {reel.user.isVerified && (
                  <BadgeCheck className="w-4 h-4 text-primary fill-primary" />
                )}
              </span>
              <button className="ml-2 px-3 py-1 border border-white rounded-lg text-white text-xs font-semibold">
                팔로우
              </button>
            </div>

            {/* Caption */}
            <p className="text-white text-sm mb-3 line-clamp-2">{reel.caption}</p>

            {/* Audio */}
            <div className="flex items-center gap-2">
              <Music2 className="w-4 h-4 text-white" />
              <span className="text-white text-xs">{reel.audioName}</span>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex flex-col items-center justify-end gap-6 p-4 pb-24">
            <button
              onClick={() => toggleLike(reel.id)}
              className="flex flex-col items-center gap-1"
            >
              <Heart
                className={cn(
                  "w-7 h-7 text-white transition-colors",
                  likedReels.has(reel.id) && "text-destructive fill-destructive"
                )}
              />
              <span className="text-white text-xs font-medium">
                {formatCount(reel.likes + (likedReels.has(reel.id) && !reel.isLiked ? 1 : 0))}
              </span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <MessageCircle className="w-7 h-7 text-white" />
              <span className="text-white text-xs font-medium">
                {formatCount(reel.comments)}
              </span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <Send className="w-7 h-7 text-white" />
              <span className="text-white text-xs font-medium">
                {formatCount(reel.shares)}
              </span>
            </button>

            <button>
              <Bookmark className="w-7 h-7 text-white" />
            </button>

            <button>
              <MoreHorizontal className="w-7 h-7 text-white" />
            </button>

            {/* Audio thumbnail */}
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/30 animate-spin-slow">
              <img
                src={reel.user.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Reel indicators */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-1">
          {reels.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-0.5 rounded-full transition-all",
                index === currentReel ? "w-6 bg-white" : "w-2 bg-white/40"
              )}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
