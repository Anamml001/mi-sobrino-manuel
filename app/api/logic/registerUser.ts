import { User, UserDoc } from "@/app/data/models";
import { SystemError, DuplicityError } from "@/app/errors"
import validate from "@/app/validate";

function registerUser(name: string, surname: string, birthdate: string, email: string, password: string): Promise<void> {
    validate.name(name);
    validate.surname(surname);
    validate.birthdate(birthdate)
    validate.email(email);
    validate.password(password);

    return (async () => {
        let user: UserDoc | null

        try {
            user = await User.findOne({ email });
        } catch (error) {
            throw new SystemError((error as Error).message);
        }

        // if (user) throw new DuplicityError("user already exists");

        // await User.create({ name, surname, birthdate: new Date(birthdate), email, password });
    })()
}

export default registerUser;