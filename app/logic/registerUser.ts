import errors from "../errors"; // Asegúrate de que la ruta sea correcta
import validate from "../validate"; // Asegúrate de que la ruta sea correcta

const { SystemError } = errors;
type ErrorKeys = keyof typeof errors;
// Función para registrar un nuevo usuario
function registerUser(name: string, surname: string, birthdate: string, email: string, password: string): Promise<undefined> {
    validate.name(name)
    validate.surname(surname)
    validate.birthdate(birthdate)
    validate.email(email)
    validate.password(password)

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, birthdate, email, surname, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(res => {
            if (res.status === 201) return

            return res.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error as keyof typeof errors];

                    throw new constructor(message)
                })
        })
}

export default registerUser;
