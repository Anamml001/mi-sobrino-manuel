import { User } from '../data';
import { errors, validateFunctions } from 'com';

const { SystemError, DuplicityError } = errors;

interface UserParams {
    name: string;
    surname: string;
    birthdate: string; // Puedes ajustar el tipo si es una Date u otro formato
    email: string;
    password: string;
}

async function registerUser({ name, surname, birthdate, email, password }: UserParams): Promise<void> {
    validateFunctions.name(name);
    // validate.surname(surname);
    // validate.email(email);
    // validate.password(password);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new DuplicityError('user already exists');

        const user = { name, surname, birthdate, email, password };
        await User.create(user);
    } catch (error) {
        throw new SystemError((error as Error).message);
    }
}

export default registerUser;