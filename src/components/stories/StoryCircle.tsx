import { cn } from "@/lib/utils";
import { Story } from "@/types";
import { Plus } from "lucide-react";

interface StoryCircleProps {
  story?: Story;
  isOwn?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StoryCircle({ story, isOwn = false, size = "md" }: StoryCircleProps) {
  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const innerSizeClasses = {
    sm: "w-[52px] h-[52px]",
    md: "w-[60px] h-[60px]",
    lg: "w-[76px] h-[76px]",
  };

  if (isOwn) {
    return (
      <button className="flex flex-col items-center gap-1">
        <div className={cn("relative", sizeClasses[size])}>
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-border">
            <img
              src={story?.user.avatar}
              alt="내 스토리"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background">
            <Plus className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>
        <span className="text-xs text-muted-foreground">내 스토리</span>
      </button>
    );
  }

  return (
    <button className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "rounded-full p-[2px]",
          sizeClasses[size],
          story?.isViewed
            ? "bg-muted"
            : "story-ring"
        )}
      >
        <div className="bg-background rounded-full p-[2px] w-full h-full">
          <div className={cn("rounded-full overflow-hidden", innerSizeClasses[size])}>
            <img
              src={story?.user.avatar}
              alt={story?.user.username}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <span className="text-xs text-foreground max-w-16 truncate">
        {story?.user.username}
      </span>
    </button>
  );
}
