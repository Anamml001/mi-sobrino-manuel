import { Comment, Post } from "@/app/data/models";
import errors from "@/app/errors";
const { SystemError, MatchError } = errors

interface Author {
    id: string;
    name: string;
    surname: string;
}

interface CommentDoc {
    id: string;
    author: Author;
    post: string;
    [key: string]: any;  // Para campos adicionales que puedan existir
}

// Ajustamos la función a TypeScript sin usar Mongoose.Document
function retrieveComments(postId: string | null): Promise<CommentDoc[]> {
    return Post.findById(postId)
        .catch((error: Error) => { throw new SystemError(error.message) })
        .then(post => {
            if (!post)
                throw new MatchError('post not found');

            // Usamos lean() para obtener objetos planos y evitamos el uso de Document
            return Comment.find({ post: postId })
                .select('-__v')
                .populate('author', 'name surname')
                .lean()
                .catch((error: Error) => { throw new SystemError(error.message) })
                .then((comments: any[]) => {  // 'any[]' para manejar los datos puros que lean() devuelve
                    return comments.map(comment => {
                        // Convertimos los campos _id y author._id a id (como string)
                        comment.id = comment._id.toString();
                        delete comment._id;

                        if (comment.author._id) {
                            comment.author.id = comment.author._id.toString();
                            delete comment.author._id;
                        }

                        comment.post = comment.post.toString();

                        return comment as CommentDoc;  // Tipamos cada comentario como CommentDoc
                    }).reverse();
                });
        });
}

export default retrieveComments;

