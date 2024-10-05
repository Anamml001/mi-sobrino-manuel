import { useState } from 'react';
import logic from '../logic';
import { useRouter } from 'next/navigation';

interface CreateCommentProps {
    postId: string;
    onCommentCreated: () => void;
    onCancelClick: () => void; // Añadir la propiedad aquí
}

function CreateComment({ postId, onCommentCreated }: CreateCommentProps) {
    const [comment, setComment] = useState("");

    const router = useRouter()
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        try {
            logic.createComment(postId, comment)
                .then(() => {
                    onCommentCreated();
                    setComment("");
                })
                .catch(error => {
                    console.error(error);
                    let feedback = error.message || 'Ha ocurrido un error. Por favor, intenta de nuevo.';
                    alert(feedback);
                });
        } catch (error) {
            if ((error as Error).message === 'token expired') {
                logic.logoutUser();
                alert('session expired');
                router.push('/login');
                return;
            }
            console.error(error);
            let feedback = (error as Error).message || 'Ha ocurrido un error. Por favor, intenta de nuevo.';
            alert(feedback);
        }
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleCancelComment = (event: React.FormEvent) => {
        event.preventDefault()

        setComment('')
    }

    return (
        <form className="p-2" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Escribe tu comentario..."
                value={comment}
                onChange={handleCommentChange}
            />
            <button className=" mr-2 bg-zinc-300 rounded-md" type="submit">Comentar</button>
            <button className=" bg-zinc-300 rounded-md" type="button" onClick={handleCancelComment}>Cancelar</button> {/* Botón para cancelar */}
        </form>
    );
}

export default CreateComment;
