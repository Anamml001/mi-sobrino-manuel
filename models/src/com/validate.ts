import errors from './errors';

const { ContentError, MatchError } = errors;

function validateName(name: string): void {
    if (typeof name !== 'string') throw new TypeError('name is not string');

    if (name.length < 1) {
        throw new RangeError('name is shorter than 1 character');
    }

    let nameIsBlank = true;

    for (let i = 0; i < name.length && nameIsBlank; i++) {
        const char = name[i];

        if (char !== ' ') {
            nameIsBlank = false;
        }
    }

    if (nameIsBlank) {
        throw new ContentError('name is blank');
    }
}

function validateSurname(surname: string): void {
    if (typeof surname !== 'string') throw new TypeError('surname is not string');

    if (surname.length < 1) {
        throw new RangeError('surname is shorter than 1 character');
    }

    let surnameIsBlank = true;

    for (let i = 0; i < surname.length && surnameIsBlank; i++) {
        const char = surname[i];

        if (char !== ' ') {
            surnameIsBlank = false;
        }
    }

    if (surnameIsBlank) {
        throw new ContentError('surname is blank');
    }
}

function validateBirthdate(birthdate: string): void {
    if (typeof birthdate !== 'string') throw new TypeError('birthdate is not string');

    if (birthdate.length !== 10) {
        throw new RangeError('birthdate does not have 10 characters');
    }

    if (birthdate.includes(' ')) {
        throw new ContentError('birthdate has a space character');
    }

    if (birthdate.indexOf('-') !== 4 || birthdate.lastIndexOf('-') !== 7) {
        throw new ContentError('birthdate dashes are not in correct position');
    }
}

function validateEmail(email: string): void {
    if (typeof email !== 'string') throw new TypeError('email is not string');

    if (email.length < 6) {
        throw new RangeError('email is lower than 6 characters');
    }

    if (!email.includes('@')) {
        throw new ContentError('email has no @');
    }

    if (!email.includes('.')) {
        throw new ContentError('email has no .');
    }

    if (email.lastIndexOf('.') < email.indexOf('@')) {
        throw new ContentError('email has . before @');
    }

    if (email.lastIndexOf('.') - email.indexOf('@') < 2) {
        throw new ContentError('email has . next to @');
    }

    if (email.length - 1 - email.indexOf('.') < 2) {
        throw new ContentError('email domain is lower than 2 characters');
    }

    if (email.includes(' ')) {
        throw new ContentError('email has space character');
    }
}

function validatePassword(password: string): void {
    if (typeof password !== 'string') throw new TypeError('password is not string');

    if (password.length < 8) {
        throw new RangeError('password is lower than 8 characters');
    }

    if (password.includes(' ')) {
        throw new ContentError('password has space character');
    }
}

function validateId(id: string, explain: string = 'id'): void {
    if (typeof id !== 'string') throw new TypeError(`${explain} is not a string`);

    if (id.length !== 24) throw new RangeError(`${explain} length is not 24`);

    if (id.includes(' ')) throw new ContentError(`${explain} has spaces`);

    if (!id.length) throw new ContentError(`${explain} is empty`);
}

function validateText(text: string, explain: string = 'text'): void {
    if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`);

    if (!text.length) throw new ContentError(`${explain} is empty`);
}

function validateUrl(url: string, explain: string = 'url'): void {
    if (typeof url !== 'string') throw new TypeError(`${explain} is not a string`);

    if (!url.length) throw new ContentError(`${explain} is empty`);

    if (!url.startsWith('http')) throw new ContentError(`${explain} is not an http address`);
}

function validateToken(token: string, explain: string = 'token'): void {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`);

    if (!token.length) throw new ContentError(`${explain} is empty`);

    const [, payload64,] = token.split('.');
    const payloadJSON = atob(payload64);
    const payload = JSON.parse(payloadJSON);

    const { exp } = payload;

    const now = Date.now() / 1000;

    if (exp < now) throw new MatchError(`${explain} expired`);
}

function validateTitle(title: string): void {
    if (typeof title !== 'string') throw new TypeError('title is not string');

    if (title.length < 1) {
        throw new RangeError('title is shorter than 1 character');
    }

    let titleIsBlank = true;

    for (let i = 0; i < title.length && titleIsBlank; i++) {
        const char = title[i];

        if (char !== ' ') {
            titleIsBlank = false;
        }
    }

    if (titleIsBlank) {
        throw new ContentError('title is blank');
    }
}

function validateNumber(number: number, explain: string = 'number'): void {
    if (typeof number !== 'number' || isNaN(number)) {
        throw new TypeError(`${explain} is not a number`);
    }
}

const validateFunctions = {
    name: validateName,
    surname: validateSurname,
    birthdate: validateBirthdate,
    email: validateEmail,
    password: validatePassword,
    id: validateId,
    text: validateText,
    url: validateUrl,
    token: validateToken,
    title: validateTitle,
    number: validateNumber
};

export default validateFunctions;