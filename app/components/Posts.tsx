import { useState, useEffect } from 'react';
import logic from '../logic';
import Post from './Post';

interface PostsProps {
    refreshStamp: number;
    userRole: 'admin' | 'regular' | undefined;
    onCommentClick: (postId: string) => void; // Añadir el nuevo prop
}

interface PostData {
    id: string;
    author: { username: string };
    image?: string;
    video?: string;
    text: string;
    date: string;
    likes: string[];
}

function Posts({ refreshStamp, userRole, onCommentClick }: PostsProps) {
    const [posts, setPosts] = useState<PostData[]>([]);

    const refreshPosts = async () => {
        try {
            const posts = await logic.retrievePosts();
            setPosts(posts);
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    useEffect(() => {
        refreshPosts();
    }, [refreshStamp]);

    const handlePostRemoved = () => refreshPosts();
    const handlePostUpdated = () => refreshPosts();

    return (
        <section className="flex flex-col gap-6 px-2 py-14">
            {posts.map((post) => (
                <Post
                    userRole={userRole}
                    key={post.id}
                    post={post}
                    onPostRemoved={handlePostRemoved}
                    onPostModified={handlePostUpdated}
                    onCommentClick={() => onCommentClick(post.id)} // Pasar la función al componente Post
                />
            ))}
        </section>
    );
}

export default Posts;
