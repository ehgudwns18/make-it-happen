import { Comment } from "@/types";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
    comments: Comment[];
    onReply: (userName: string, commentId: string) => void;
}

export function CommentList({ comments, onReply }: CommentListProps) {
    if (comments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <p className="text-sm">아직 댓글이 없습니다.</p>
                <p className="text-xs mt-1">첫 번째 댓글을 남겨보세요!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-4 pb-8 max-h-[60vh] overflow-y-auto">
            {comments.map((comment) => (
                <div key={comment.id} className="flex flex-col gap-3">
                    <CommentItem comment={comment} onReply={onReply} topLevelId={comment.id} />
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="pl-12 flex flex-col gap-3">
                            {comment.replies.map((reply) => (
                                <CommentItem key={reply.id} comment={reply} onReply={onReply} isReply topLevelId={comment.id} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
