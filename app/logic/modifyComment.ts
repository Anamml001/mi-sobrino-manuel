import errors from "../errors"
import validate from "../validate"; // Asegúrate de que la ruta sea correcta
const { SystemError } = errors;
type ErrorKeys = keyof typeof errors;

function modifyComment(postId: string, commentId: string, text: string) {

    validate.token(sessionStorage.token)
    validate.id(postId, 'postId')
    validate.id(commentId, 'commentId')
    validate.text(text)


    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId, commentId, text })
    })

        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 204) return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error as keyof typeof errors];

                    throw new constructor(message)
                })
        })
}

export default modifyComment