import { Search } from "lucide-react";
import { useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { exploreImages } from "@/data/mockData";
import { cn } from "@/lib/utils";

const trendingTags = ["#travel", "#food", "#fashion", "#nature", "#photography", "#art"];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container max-w-lg mx-auto px-4 py-2">
          <div
            className={cn(
              "flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 transition-all",
              isFocused && "ring-2 ring-primary"
            )}
          >
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </header>

      <main className="pt-14 pb-16">
        {/* Trending Tags */}
        <div className="px-4 py-3 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2">
            {trendingTags.map((tag) => (
              <button
                key={tag}
                className="flex-shrink-0 px-4 py-1.5 bg-secondary rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-[2px]">
          {exploreImages.map((image, index) => (
            <button
              key={index}
              className={cn(
                "aspect-square bg-muted overflow-hidden",
                index === 2 && "row-span-2 col-span-2",
                index === 7 && "row-span-2 col-span-2"
              )}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover hover:opacity-90 transition-opacity"
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
