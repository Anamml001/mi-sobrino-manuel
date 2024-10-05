import errors from "../errors"
import validate from "../validate"; // Asegúrate de que la ruta sea correcta
const { SystemError } = errors;
type ErrorKeys = keyof typeof errors;


function retrieveComments(postId: string) {
    validate.id(postId, 'postId');

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${postId}`, {
        method: 'GET',
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 200) {
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(comments => comments);
            }

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body;


                    const constructor = errors[error as keyof typeof errors];
                });
        });
}

export default retrieveComments;