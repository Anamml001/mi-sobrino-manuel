import { User, Post, PostDoc } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";
import { Types } from "mongoose";

const {ObjectId } = Types;

interface CreatePostInput {
  userId: string;
  title: string;
  image?: string;
  video?: string;
  text: string;
}

function createPost({ userId, title, image, video, text }: CreatePostInput): Promise<PostDoc> {
  validate.id(userId, 'userId');
  validate.text(title, 'title');

  if (image) {
    if (video) throw new MatchError('image and video are both set');
    validate.url(image, 'image');
  } else if (video) {
    validate.url(video, 'video');
  }

  validate.text(text);

  return User.findById(userId)
    .catch(error => { throw new SystemError((error as Error).message); })
    .then(user => {
      if (!user)
        throw new MatchError('user not found');

      if (user.role !== 'admin')
        throw new MatchError('Only admins can create posts');
      const author = new ObjectId(user.id as string)
      const post = {
        author,
        title,
        image,
        video,
        text,
        date: new Date()
      };

      return Post.create(post)
        .catch((error) => { throw new SystemError((error as Error).message); });
    });
}

export default createPost;