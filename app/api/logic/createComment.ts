import { User, Comment, CommentDoc, Post } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";
import { Types } from "mongoose";

const { ObjectId } = Types;

function createComment(userId: string, postId: string, text: string): Promise<CommentDoc> {
  validate.id(userId, 'userId');
  validate.id(postId, 'postId');
  validate.text(text, 'text');

  return User.findById(userId)
    .catch(error => { throw new SystemError((error as Error).message); })
    .then(user => {
      if (!user)
        throw new MatchError('user not found');

      return Post.findById(postId)
        .catch(error => { throw new SystemError((error as Error).message); })
        .then(postFromDb => {
          if (!postFromDb)
            throw new MatchError('post not found')
          const author = new ObjectId(user.id as string)
          const post = new ObjectId(postFromDb.id as string)
          const comment = {
            author,
            post,
            text,
            date: new Date()
          };

          return Comment.create(comment)
            .catch((error) => { throw new SystemError((error as Error).message); });
        })

    });
}

export default createComment;