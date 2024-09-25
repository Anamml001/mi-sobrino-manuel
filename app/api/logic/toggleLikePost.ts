import { User, Post } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";
import { ObjectId } from "mongoose";

//mirar tipado en post y error

function toggleLikePost(userId:string, postId: string): Promise<void> {
    validate.id(userId, 'userId');
    validate.id(postId, 'postId')

    return User.findById(userId)
        .catch(error => { throw new SystemError((error as Error).message) })
        .then(user => {
            if (!user) throw new MatchError('user not found')

            return Post.findById(postId)
                .catch(error => { throw new SystemError((error as Error).message) })
        })
        .then((post:any) => {
            if (!post) throw new MatchError('post not found')

            const index = post.likes.findIndex((userId2:ObjectId) => userId2.toString() === userId)

            if (index < 0) 
                post.likes.push(userId)
            else 
                post.likes.splice(index, 1)

            return post.save()
                .catch((error: Error) => { throw new SystemError((error as Error).message) })
                .then(() => {})
        })

}

export default toggleLikePost