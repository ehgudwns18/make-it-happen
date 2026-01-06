
import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, BadgeCheck } from "lucide-react";
import { Post, Comment } from "@/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CommentList } from "./CommentList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/data/mockData";
import { usePostInteraction } from "@/hooks/usePostInteraction";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { isLiked, isSaved, likes, showHeart, handleDoubleTap, handleLike, toggleSave } = usePostInteraction(post);
  const [currentImage, setCurrentImage] = useState(0);
  const [replyingTo, setReplyingTo] = useState<{ username: string, id: string } | null>(null);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");

  const handleReply = (username: string, id: string) => {
    setReplyingTo({ username, id });
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;

    if (replyingTo) {
      // Add reply
      setComments(prev => prev.map(comment => {
        if (comment.id === replyingTo.id) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: `r-${Date.now()}`,
                user: currentUser,
                text: commentText,
                timestamp: new Date(),
                likes: 0
              }
            ]
          };
        }
        return comment;
      }));
      setReplyingTo(null);
    } else {
      // Add top-level comment
      setComments(prev => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          user: currentUser,
          text: commentText,
          timestamp: new Date(),
          likes: 0,
          replies: []
        }
      ]);
    }
    setCommentText("");
  };

  const formatLikes = (count: number) => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}만`;
    }
    return count.toLocaleString();
  };

  return (
    <article className="border-b border-border animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="story-ring w-9 h-9">
            <div className="bg-background rounded-full p-[2px] w-full h-full">
              <img
                src={post.user.avatar}
                alt={post.user.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm">{post.user.username}</span>
              {post.user.isVerified && (
                <BadgeCheck className="w-4 h-4 text-primary fill-primary" />
              )}
            </div>
            {post.location && (
              <span className="text-xs text-muted-foreground">{post.location}</span>
            )}
          </div>
        </div>
        <button className="p-2" aria-label="더보기">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative aspect-square bg-muted"
        onDoubleClick={handleDoubleTap}
      >
        <img
          src={post.images[currentImage]}
          alt="게시물"
          className="w-full h-full object-cover"
        />

        {/* Double tap heart animation */}
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart
              className="w-24 h-24 text-white drop-shadow-lg animate-heart"
              fill="white"
            />
          </div>
        )}

        {/* Image indicators */}
        {post.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {post.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  currentImage === index
                    ? "bg-primary w-2"
                    : "bg-white/60"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="transition-transform active:scale-75"
              aria-label={isLiked ? "좋아요 취소" : "좋아요"}
            >
              <Heart
                className={cn(
                  "w-6 h-6 transition-colors",
                  isLiked && "text-destructive fill-destructive"
                )}
              />
            </button>

            <Drawer>
              <DrawerTrigger asChild>
                <button className="transition-transform active:scale-90" aria-label="댓글">
                  <MessageCircle className="w-6 h-6" />
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle className="text-center">댓글</DrawerTitle>
                  </DrawerHeader>
                  <CommentList comments={comments} onReply={handleReply} />
                  <div className="p-4 border-t flex gap-2 items-center">
                    <div className="story-ring w-8 h-8 flex-shrink-0">
                      <div className="bg-background rounded-full p-[1px] w-full h-full">
                        <img
                          src={currentUser.avatar}
                          alt="Current User"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      {replyingTo && (
                        <div className="absolute -top-6 left-0 text-xs text-muted-foreground bg-background/80 backdrop-blur px-2 py-0.5 rounded flex items-center gap-1">
                          <span>Replying to <b>@{replyingTo.username}</b></span>
                          <button onClick={() => setReplyingTo(null)} className="ml-1 hover:text-foreground">×</button>
                        </div>
                      )}
                      <Input
                        placeholder={replyingTo ? `@${replyingTo.username}님에게 답글 달기...` : `@${post.user.username}님에게 댓글 달기...`}
                        className="h-9 text-sm"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                            handlePostComment();
                          }
                        }}
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary font-semibold px-2 shrink-0"
                      onClick={handlePostComment}
                      disabled={!commentText.trim()}
                    >
                      게시
                    </Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>

            <button className="transition-transform active:scale-90" aria-label="공유">
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={toggleSave}
            className="transition-transform active:scale-75"
            aria-label={isSaved ? "저장 취소" : "저장"}
          >
            <Bookmark
              className={cn(
                "w-6 h-6 transition-colors",
                isSaved && "fill-foreground"
              )}
            />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-1">
          좋아요 {formatLikes(likes)}개
        </p>

        {/* Caption */}
        <p className="text-sm">
          <span className="font-semibold mr-1">{post.user.username}</span>
          {post.caption}
        </p>

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(post.timestamp, { addSuffix: true, locale: ko })}
        </p>
      </div>
    </article>
  );
}
