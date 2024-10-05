import { Post, User } from "@/app/data/models";
import { MatchError, SystemError } from "@/app/errors";
import validate from "@/app/validate";

interface Author {
    id: string;
    name: string;
    surname: string;
}

interface PostDocument {
    id: string;
    title: string;
    text: string;
    image?: string;
    video?: string;
    likes: string[];
    author: Author;
    date: Date;
}

function retrievePosts(): Promise<PostDocument[]> {


    return (async () => {
        try {
            const posts: any[] = await Post.find()
                .select('-__v')
                .populate('author', 'name surname')
                .lean()
                .catch(error => { throw new SystemError((error as Error).message); });


            const transformedPosts: PostDocument[] = posts.map(post => {

                const transformedPost: PostDocument = {
                    id: post._id.toString(),
                    title: post.title,
                    text: post.text,
                    image: post.image,
                    video: post.video,
                    likes: post.likes.map((userId: any) => userId.toString()),
                    author: {
                        id: post.author._id.toString(),
                        name: post.author.name,
                        surname: post.author.surname
                    },
                    date: post.date
                };

                return transformedPost;
            });

            return transformedPosts.reverse();

        } catch (error) {
            const _error = error as Error;
            throw new SystemError(_error.message);
        }
    })()
}

export default retrievePosts;