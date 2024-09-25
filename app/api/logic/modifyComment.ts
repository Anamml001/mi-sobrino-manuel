import { User, Post, Comment } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";

function modifyComment(userId:string, postId:string, commentId:string, text:string): Promise<void> {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError((error as Error).message) })
        .then(user => {
            if (!user) {
                throw new MatchError('user not found')
            }

            return Post.findById(postId)
                .catch(error => { throw new SystemError((error as Error).message) })
                .then(post => {
                    if (!post) {
                        throw new MatchError('post not found')
                    }
                    return Comment.findById(commentId)
                        .catch(error => { throw new SystemError((error as Error).message) })
                        .then(comment => {
                            if (!comment) {
                                throw new MatchError('comment not found')
                            }
                            if (userId !== comment.author.toString()) {
                                throw new MatchError('cant edit comment')
                            }

                            comment.text = text
                            return comment.save()
                        })
                        .then(() => { })
                })
        })
}
export default modifyComment