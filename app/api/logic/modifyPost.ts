import { User, Post } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";

function modifyPost(userId: string, postId: string, text: string): Promise<void> {
  validate.id(userId, 'userId');
  validate.id(postId, 'postId');
  validate.text(text);

  return User.findById(userId)
    .catch(error => { throw new SystemError((error as Error).message); })
    .then(user => {
      if (!user)
        throw new MatchError('user not found');

      return Post.findById(postId)
        .catch(error => { throw new SystemError((error as Error).message); })
        .then(post => {
          if (!post)
            throw new MatchError('post not found');

          if (user.role !== 'admin')
            throw new MatchError('only admin users can modify posts');

          post.text = text;

          return post.save()
            .catch(error => { throw new SystemError((error as Error).message); });
        });
    })
    .then(() => { });
}

export default modifyPost;