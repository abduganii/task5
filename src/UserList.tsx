import { faker, UsableLocale } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import { generateAddress } from './AddressGenerator';
import { addTypos } from './addTypos';


import { Person } from './Person';
import { useScrollPosition } from './useScrollPosition';

export type UserListParameters = {
    locale: UsableLocale;
    seed: number;
    typos: number;
};


export const UserList = ({ locale, seed, typos }: UserListParameters) => {
    const [peopleList, setPeopleList] = useState([] as Person[]);

    const scrollPosition = useScrollPosition();

    function addEntry(clear?: boolean) {
        let tempUserList: Person[];

        if (clear) tempUserList = [];
        else tempUserList = [...peopleList];

        for (let i = 0; i < 20; i++) {
            let person = {
                UUID: faker.datatype.number().toString(),
                fullName: faker.name.fullName(),
                address: generateAddress(),
                phone: faker.phone.number(),
            };
            tempUserList.push(person);
        }
        tempUserList.map((person) => {
            return addTypos(person, typos);
        });
        setPeopleList(tempUserList);
    }

    useEffect(() => {
        if (scrollPosition < 0) addEntry();
    }, [scrollPosition]);

    function generatePeopleList() {
        faker.setLocale(locale);
        faker.seed(seed);
        addEntry(true);
    }

    useEffect(generatePeopleList, [locale, seed, typos]);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Index</th>
                        <th scope="col">ID</th>
                        <th scope="col">Full name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone number</th>
                    </tr>
                </thead>
                <tbody>
                    {peopleList.map((person, index) => {
                        return (
                            <tr key={index}>
                                <td scope="row">{index + 1}</td>
                                <td className="short">{person.UUID}</td>
                                <td>{person.fullName}</td>
                                <td>{person.address}</td>
                                <td>{person.phone}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
