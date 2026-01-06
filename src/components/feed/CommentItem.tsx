import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Comment } from "@/types";

interface CommentItemProps {
    comment: Comment;
    onReply: (userName: string, commentId: string) => void;
    isReply?: boolean;
    topLevelId: string;
}

export function CommentItem({ comment, onReply, isReply = false, topLevelId }: CommentItemProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(comment.likes);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    return (
        <div className="flex gap-3 items-start group">
            <div className={cn("story-ring flex-shrink-0", isReply ? "w-6 h-6" : "w-8 h-8")}>
                <div className="bg-background rounded-full p-[1px] w-full h-full">
                    <img
                        src={comment.user.avatar}
                        alt={comment.user.username}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
            </div>
            <div className="flex-1 text-sm">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{comment.user.username}</span>
                    <span className="text-muted-foreground text-xs">
                        {formatDistanceToNow(comment.timestamp, { addSuffix: true, locale: ko })}
                    </span>
                </div>
                <p className="mt-0.5 leading-snug">{comment.text}</p>
                <button
                    onClick={() => onReply(comment.user.username, topLevelId)}
                    className="text-xs text-muted-foreground font-semibold mt-1"
                >
                    답글 달기
                </button>
            </div>
            <div className="flex flex-col items-center gap-1">
                <button onClick={handleLike} className="flex flex-col items-center justify-center p-1">
                    <Heart
                        className={cn("w-3.5 h-3.5", isLiked ? "fill-destructive text-destructive" : "text-muted-foreground")}
                    />
                    <span className="text-[10px] text-muted-foreground">{likes > 0 ? likes : ""}</span>
                </button>
            </div>
        </div>
    );
}
