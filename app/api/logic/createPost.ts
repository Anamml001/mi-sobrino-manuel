import { User, UserDoc } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";

interface CreatePostInput {
  userId: string;
  title: string;
  image?: string;
  video?: string;
  text: string;
}

async function createPost({ userId, title, image, video, text }: CreatePostInput): Promise<void> {
  validate.id(userId, 'userId');
  validate.text(title, 'title');
  
  if (image) {
    if (video) throw new MatchError('image and video are both set');
    validate.url(image, 'image');
  } else {
    validate.url(video, 'video');
  }

  validate.text(text);

  let user: UserDoc | null;

  try {
    user = await User.findById(userId);
  } catch (error) {
    throw new SystemError((error as Error).message);
  }

  if (!user) throw new MatchError('user not found');

  if (user.role !== 'admin') throw new MatchError('Only admins can create posts');

  const post: Partial<PostDoc> = {
    author: user._id,
    title,
    text,
    date: new Date()
  };

  if (image) post.image = image;
  else if (video) post.video = video;

  try {
    await Post.create(post);
  } catch (error) {
    throw new SystemError((error as Error).message);
  }
}

export default createPost;