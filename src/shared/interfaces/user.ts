import { Advert } from "./advert";

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    gender: string,
    age: number | null,
    phone: string,
    favorites: Advert[],
}