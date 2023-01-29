import { faker } from '@faker-js/faker';
import { LocaleAlphabetRanges } from './LocaleAlphabets';
import { Person, personLengthLimits } from './Person';

const typoType = [
    (value: string) => {
        // Remove
        const chosenLetter = faker.datatype.number(value.length - 1);
        return value.slice(0, chosenLetter) + value.slice(chosenLetter + 1);
    },
    (value: string) => {
        // Swap
        if (value.length < 2) return value;
        const chosenLetter = faker.datatype.number({
            min: 0,
            max: value.length - 2,
        });
        const letter = value.at(chosenLetter);
        const nextLetter = value.at(chosenLetter + 1);

        return (
            value.slice(0, chosenLetter) +
            nextLetter +
            letter +
            value.slice(chosenLetter + 2, value.length)
        );
    },
    (value: string) => {
        // Add
        const locale = faker.locale as 'ru' | 'en_AU' | 'de_AT';
        const alphabet = LocaleAlphabetRanges[locale];
        let chosenLetter = alphabet[faker.datatype.number(alphabet.length - 1)];
        if (typeof chosenLetter !== 'string') {
            const code = faker.datatype.number({
                min: chosenLetter.from,
                max: chosenLetter.to,
            });
            chosenLetter = String.fromCharCode(code);
        }
        const chosenIndex = faker.datatype.number(value.length);
        return (
            value.slice(0, chosenIndex) +
            chosenLetter +
            value.slice(chosenIndex)
        );
    },
];

function getRandomPersonField(): 'UUID' | 'fullName' | 'address' | 'phone' {
    const options: ['UUID', 'fullName', 'address', 'phone'] = [
        'UUID',
        'fullName',
        'address',
        'phone',
    ];
    const result: 'UUID' | 'fullName' | 'address' | 'phone' =
        options[faker.datatype.number({ min: 0, max: options.length - 1 })];
    return result;
}

export function addTypos(person: Person, typos: number = 0): Person {
    if (typos === 0) return person;
    while (typos > 0) {
        if (typos < 1) {
            if (
                faker.datatype.float({ min: 0, max: 1, precision: 0.01 }) >
                typos
            ) {
                break;
            }
        }

        const field = getRandomPersonField();
        let min = 0;
        let max = 2;
        if (person[field].length <= 1) min = 1;
        if (person[field].length > personLengthLimits[field]) max = 1;
        person[field] = typoType[faker.datatype.number({ min: min, max: max })](
            person[field]
        );

        typos--;
    }

    return person;
}
