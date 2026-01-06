import { createContext, useContext, useState, ReactNode } from "react";
import { Post } from "@/types";
import { posts as initialPosts } from "@/data/mockData";

interface PostContextType {
    posts: Post[];
    addPost: (post: Post) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);

    const addPost = (post: Post) => {
        setPosts((prev) => [post, ...prev]);
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );
}

export function usePostContext() {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error("usePostContext must be used within a PostProvider");
    }
    return context;
}
