import errors from "../errors"; // Asegúrate de que la ruta sea correcta
import validate from "../validate"; // Asegúrate de que la ruta sea correcta
import extractPayload from "../util/extractPayload";
import { userData } from "../types/types";
const { SystemError } = errors;
type ErrorKeys = keyof typeof errors;

function retrieveUser(): Promise<any> {
    validate.token(sessionStorage.token)

    const { sub: userId }: { sub: string } = extractPayload(sessionStorage.token)

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 200)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then((user: userData) => user)

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error as keyof typeof errors];

                    throw new constructor(message)
                })
        })
}

export default retrieveUser