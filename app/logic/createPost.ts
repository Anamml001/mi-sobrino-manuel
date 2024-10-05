import errors from "../errors"
import validate from "../validate"; // Asegúrate de que la ruta sea correcta
const { SystemError, MatchError } = errors;
type ErrorKeys = keyof typeof errors;


function createPost(title: string, text: string, image: string, video: string) {
    validate.token(sessionStorage.token)
    validate.text(title, 'title')

    if (image) {
        if (video) throw new MatchError('image and video are both set')
        validate.url(image, 'image')
    }
    else validate.url(video, 'video')

    const payload = { title, text, image, video }

    if (image) payload.image = image
    else if (video) payload.video = video

    validate.text(text)
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 201)
                return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error as keyof typeof errors];

                    throw new constructor(message)
                })
        })
}

export default createPost