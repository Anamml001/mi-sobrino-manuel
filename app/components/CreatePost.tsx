import logic from '../logic';

interface CreatePostProps {
    onCancelClick: () => void;
    onPostCreated: () => void;
}

function CreatePost({ onCancelClick, onPostCreated }: CreatePostProps) {
    const handleCancelClick = () => onCancelClick();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const title = (form.elements.namedItem('title') as HTMLInputElement).value;
        const image = (form.elements.namedItem('image') as HTMLInputElement).value;
        const video = (form.elements.namedItem('video') as HTMLInputElement).value;
        const text = (form.elements.namedItem('text') as HTMLInputElement).value;

        try {
            logic
                .createPost(title, text, image, video)
                .then(() => onPostCreated())
                .catch((error: Error) => {
                    console.error(error);
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
            alert((error as Error).message);
        }
    };

    console.debug('CreatePost render');

    return (
        <section className="bg-green-100 fixed bottom-0 left-0 w-full border-t-2 border-black pb-2 px-2">
            <h2 className="font-bold text-xl py-2">Create Post</h2>
            <form className="flex flex-col gap-2 mb-12" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input className="border-b-2 border-black" type="text" id="title" required />
                <label htmlFor="image">Image</label>
                <input className="border-b-2 border-black" type="url" id="image" />
                <label htmlFor="video">Video</label>
                <input className="border-b-2 border-black" type="url" id="video" />
                <label htmlFor="text">Text</label>
                <input className="border-b-2 border-black" type="text" id="text" required />
                <button className="rounded-xl border-2 border-black px-3 self-center" type="submit">
                    Create
                </button>
                <button
                    className="rounded-xl border-2 border-black px-3 self-center"
                    type="button"
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            </form>
        </section>
    );
}

export default CreatePost;

