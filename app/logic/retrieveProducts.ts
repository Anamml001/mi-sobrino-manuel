
import errors from "../errors";
import validate from "../validate";

type ErrorKeys = keyof typeof errors;

const { SystemError } = errors;

function retrieveProducts() {


    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'GET',

    })
        .catch(error => {
            throw new Error(error.message);
        })
        .then(res => {
            if (res.status === 200) {
                return res.json()
                    .catch(error => {
                        throw new SystemError(error.message);
                    })
                    .then(posts => posts);
            }
            return res.json()
                .catch(error => {
                    throw new SystemError(error.message);
                })
                .then(body => {
                    const { error, message } = body;
                    const constructor = errors[error as keyof typeof errors];
                    throw new constructor(message);
                });
        });
}

export default retrieveProducts;
