import { useState } from "react";
import { Post } from "@/types";

export function usePostInteraction(post: Post) {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [isSaved, setIsSaved] = useState(post.isSaved);
    const [likes, setLikes] = useState(post.likes);
    const [showHeart, setShowHeart] = useState(false);

    const handleDoubleTap = () => {
        if (!isLiked) {
            setIsLiked(true);
            setLikes((prev) => prev + 1);
        }
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 600);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    const toggleSave = () => {
        setIsSaved(!isSaved);
    };

    return {
        isLiked,
        isSaved,
        likes,
        showHeart,
        handleDoubleTap,
        handleLike,
        toggleSave,
    };
}
