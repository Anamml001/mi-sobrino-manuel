import { useState, useEffect, FormEvent } from 'react';
import logic from '../logic';
import CreateComment from './CreateComment';
import ToggleLikeButton from './ToggleLikeButton';
import { useRouter } from 'next/navigation';

interface PostProps {
    post: {
        id: string;
        author: { username: string };
        image?: string;
        video?: string;
        text: string;
        date: string;
        likes: string[];
    };
    onPostRemoved: () => void;
    onPostModified: () => void;
    onCommentClick: () => void;
    userRole: 'admin' | 'regular' | undefined;
}

interface Comment {
    id: string;
    author: { id: string; name: string; surname: string };
    text: string;
}

function Post({ userRole, post, onPostRemoved, onPostModified }: PostProps) {
    const [modifyPost, setModifyPost] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [modifyComment, setModifyComment] = useState({ id: '', text: '' });
    const [userId, setUserId] = useState<string | null>(null);

    const route = useRouter()

    useEffect(() => {
        refreshComments();
    }, [post.id]);

    const refreshComments = async () => {
        try {
            const comments = await logic.retrieveComments(post.id);
            setComments(comments);
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleRemovePost = async () => {
        try {
            if (confirm('¿Eliminar post?')) {
                await logic.removePost(post.id);
                onPostRemoved();
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleModifySubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const text = form.text.value;

        try {
            await logic.modifyPost(post.id, text);
            onPostModified();
            setModifyPost(false);
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleModifyPost = () => setModifyPost(true);

    const handleCommentCreated = () => {
        refreshComments();
    };

    const handleRemoveComment = async (commentId: string) => {
        try {
            if (confirm('¿Eliminar comentario?')) {
                await logic.removeComment(commentId);
                refreshComments();
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleModifyComment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await logic.modifyComment(post.id, modifyComment.id, modifyComment.text);
            refreshComments();
            setModifyComment({ id: '', text: '' });
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleEditComment = (commentId: string, commentText: string) => {
        setModifyComment({ id: commentId, text: commentText });
    };

    const handleCancelModify = () => {
        setModifyComment({ id: '', text: '' });
    };

    const handleToggleLikePost = async () => {
        try {
            await logic.toggleLikePost(post.id);
            onPostModified();
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        }
    };

    useEffect(() => {
        try {
            const loggedUserId = logic.getLoggedInUserId();
            setUserId(loggedUserId);
        } catch (error: any) {
            if (error.message === 'token expired') {
                logic.logoutUser();
                alert('Sesión expirada');
                route.push('/login');
            }
        }
    }, []);

    const isLiked = logic.isUserLoggedIn() && post.likes.includes(userId || '');

    function formatDate(isoDate: string) {
        const date = new Date(isoDate);
        return date.toLocaleString();
    }

    return (
        <article className="w-full md:flex bg-white p-2 flex-col align-middle">
            <h3 className="font-bold cursor-pointer ">{post.author.username}</h3>
            {post.image && <img src={post.image} className="w-full" alt="Post Image" />}
            {post.video && (
                <div className="aspect-w-16 h-[800px]">
                    <iframe
                        className="w-full h-full"
                        src={`https://www.tiktok.com/embed/${post.video.slice(-19)}`}
                        title="Post Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                </div>
            )}
            {!modifyPost && <p>{post.text}</p>}
            {modifyPost && (
                <form onSubmit={handleModifySubmit}>
                    <input type="text" defaultValue={post.text} name="text" />
                    <button className="px-3" type="submit">✅</button>
                </form>
            )}
            <time className="block text-right text-xs">{formatDate(post.date)}</time>
            {userRole === 'admin' && (
                <div>
                    <button className="px-3" onClick={handleModifyPost}>📝</button>
                    <button className="px-3" onClick={handleRemovePost}>🗑️</button>
                </div>
            )}
            <ToggleLikeButton onClick={handleToggleLikePost} isLiked={isLiked} />
            {logic.isUserLoggedIn() && <CreateComment postId={post.id} onCommentCreated={handleCommentCreated} onCancelClick={handleCancelModify} />}

            <div>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        {modifyComment.id !== comment.id ? (
                            <div>
                                <p className="text-green-600">
                                    {comment.author.name} {comment.author.surname}
                                </p>
                                <p>{comment.text}</p>
                            </div>
                        ) : (
                            <div className="flex flex-row justify-center gap-1">
                                <form onSubmit={handleModifyComment} className="flex flex-row gap-1">
                                    <input
                                        id="text"
                                        type="text"
                                        placeholder="edit text"
                                        value={modifyComment.text}
                                        onChange={(e) => setModifyComment({ ...modifyComment, text: e.target.value })}
                                    />
                                    <button type="submit">Modificar</button>
                                </form>
                                <button onClick={handleCancelModify}>Cancelar</button>
                            </div>
                        )}
                        {logic.isUserLoggedIn() && comment.author.id === userId && (
                            <div>
                                <button onClick={() => handleEditComment(comment.id, comment.text)}>✏</button>
                                <button onClick={() => handleRemoveComment(comment.id)}>🗑️</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </article>
    );
}

export default Post;
