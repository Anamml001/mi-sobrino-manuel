import { User, Comment } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";

function removeComment( userId: string, commentId: string): Promise<void> {
    validate.id(userId, 'userId');
    validate.id(commentId, 'commentId');

    return User.findById(userId)
        .catch(error => { throw new SystemError((error as Error).message); })
        .then(user => {
            if (!user)
                throw new MatchError('user not found');

            return Comment.findById(commentId)
                .catch(error => { throw new SystemError((error as Error).message); })
                .then(comment => {
                    if (!comment)
                        throw new MatchError('comment not found')
                    if (comment.author.toString() !== userId)
                        throw new MatchError('author not found')

                    return Comment.findByIdAndDelete(commentId)
                        .catch((error) => { throw new SystemError((error as Error).message); })
                        .then(() => { })
                })


        })
}
export default removeComment;