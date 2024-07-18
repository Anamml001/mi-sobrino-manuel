import { User, UserDoc } from "@/app/data/models";
import { SystemError, MatchError } from "@/app/errors";
import validate from "@/app/validate";

function authenticateUser(email: string, password: string): Promise<string> {
    validate.email(email);
    validate.password(password);

    return (async () => {
        let user: UserDoc | null;

        try {
            user = await User.findOne({ email });
        } catch (error) {
            throw new SystemError((error as Error).message);
        }

        if (!user)
            throw new MatchError('user not found');

        if (user.password !== password)
            throw new MatchError('wrong credentials');

        return user.id;
    })()
}

export default authenticateUser;