import validate from "../validate"
import extractPayload from "../util/extractPayload"

function getLoggedInUserId() {
    validate.token(sessionStorage.token)

    const { sub: userId }: { sub: string } = extractPayload(sessionStorage.token)

    return userId
}

export default getLoggedInUserId