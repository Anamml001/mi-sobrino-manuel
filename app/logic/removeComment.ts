import errors from "../errors"
import validate from "../validate"; // Asegúrate de que la ruta sea correcta
const { SystemError } = errors;
type ErrorKeys = keyof typeof errors;


function removeComment(commentId: string) {

    validate.id(commentId, 'commentId')

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify({ commentId })
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

export default removeComment