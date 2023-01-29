export type Person = {
    UUID: string;
    fullName: string;
    address: string;
    phone: string;
};

export const personLengthLimits = {
    UUID: 6,
    fullName: 30,
    address: 100,
    phone: 25
}