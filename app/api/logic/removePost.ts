import { User, Post, PostDoc } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";

function removePost( userId: string, postId: string): Promise<void> {
    validate.id(userId, 'userId');
    validate.id(postId, 'postId');

    return User.findById(userId)
        .catch(error => { throw new SystemError((error as Error).message); })
        .then(user => {
            if (!user) {
                throw new MatchError('user not found');
            }

            if (user.role !== 'admin') {
                throw new MatchError('Only admins can remove posts');
            }

            return Post.findById(postId)
                .catch(error => { throw new SystemError((error as Error).message); })
                .then(post => {
                    if (!post) {
                        throw new MatchError('post not found');
                    }

                    return Post.deleteOne({ _id: postId })
                        .catch(error => { throw new SystemError((error as Error).message); })
                        .then(() => {})

                });
        });
}

export default removePost;