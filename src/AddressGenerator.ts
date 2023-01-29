import { faker } from '@faker-js/faker';

const STATE = faker.address.state;
const CITY = faker.address.city;
const STREET = faker.address.streetAddress;
const SECONDARY = faker.address.secondaryAddress;
const ZIPCODE = faker.address.zipCode;

const templates = [
    [STREET, CITY, STATE, ZIPCODE],
    [STATE, CITY, STREET, SECONDARY, ZIPCODE],
    [CITY, STREET, ZIPCODE],
    [STATE, CITY, STREET, ZIPCODE],
    [STREET, SECONDARY, CITY, ZIPCODE],
];

export function generateAddress() {
    const chosenTemplate =
        templates[faker.datatype.number({ min: 0, max: templates.length - 1 })];
    let result = '';
    chosenTemplate.forEach((entry, index) => {
        result += entry();
        if (index < chosenTemplate.length - 1) result += ', ';
    });
    return result;
}
