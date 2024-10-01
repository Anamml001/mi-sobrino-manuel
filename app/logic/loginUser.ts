import errors from "../errors"; // Asegúrate de que la ruta sea correcta
import validate from "../validate"; // Asegúrate de que la ruta sea correcta

const { SystemError } = errors;
type ErrorKeys = keyof typeof errors;

function loginUser(email: string, password: string): Promise<undefined> {
    validate.email(email)
    validate.password(password)

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 200)
                return res.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then(token => sessionStorage.token = token)

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error as keyof typeof errors];
                    throw new constructor(message)
                })
        })
}

export default loginUser