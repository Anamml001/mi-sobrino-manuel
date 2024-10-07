"use client"
import { useState, useEffect } from 'react';

import Posts from '../components/Posts';
import CreatePost from '../components/CreatePost';
import CreateComment from '../components/CreateComment';
import logic from '../logic';
import type { userData } from '../types/types';


function Gallery() {
    const [user, setUser] = useState<userData | null>(null)
    const [view, setView] = useState<string | null>(null);
    const [refreshStamp, setRefreshStamp] = useState<number>(Date.now());
    const [currentPostId, setCurrentPostId] = useState<string | null>(null); // Guardar el postId actual para crear comentarios

    useEffect(() => {
        try {
            if (logic.isUserLoggedIn()) {
                logic.retrieveUser()
                    .then((user: userData) => setUser(user))
                    .catch((error: Error) => {
                        console.error(error)
                        alert((error as Error).message)
                    })

            }
        } catch (error: any) {
            console.error(error)
            alert((error as Error).message)
        }
    }, [])

    const handleCreatePostClick = () => setView('create-post');

    const handleCreatePostCancelClick = () => setView(null);

    const handleCreateCommentClick = (postId: string) => {
        setCurrentPostId(postId); // Establecer el postId actual
        setView('create-comment');
    };

    const handleCreateCommentCancelClick = () => setView(null);

    const handlePostCreated = () => {
        setView(null);
        setRefreshStamp(Date.now()); // Actualizar para refrescar los posts
    };

    console.log('Gallery render');

    return (
        <>
            <main className="main">
                <h1 className="mt-10 font-bold text-2xl text-center text-green-900">GALERÍA</h1>

                {user?.role === 'admin' && (
                    <button className="px-3 bg-slate-400 rounded-md content-center" onClick={handleCreatePostClick}> Crear Post➕</button>
                )}

                <Posts
                    userRole={user?.role}
                    refreshStamp={refreshStamp}
                    onCommentClick={handleCreateCommentClick} // Pasar el handler para crear comentarios
                />

                {view === 'create-comment' && currentPostId && (
                    <CreateComment
                        postId={currentPostId} // Asegúrate de pasar el postId al componente de comentarios
                        onCancelClick={handleCreateCommentCancelClick}
                        onCommentCreated={() => {
                            setView(null);
                            setRefreshStamp(Date.now()); // Refrescar la lista de posts
                        }}
                    />
                )}

                {view === 'create-post' && (
                    <CreatePost
                        onCancelClick={handleCreatePostCancelClick}
                        onPostCreated={handlePostCreated}
                    />
                )}
            </main>
        </>
    );
}

export default Gallery;

