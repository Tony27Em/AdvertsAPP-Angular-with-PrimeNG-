interface Info {
    name: string,
    value: string | number,
}

export interface Comment {
    id: number,
    userid: number,
    author: string,
    text: string,
    date: string,
}

export interface Advert {
    id: number,
    userid: number,
    username: string,
    phone: number,
    title: string,
    info: Info[],
    price: number,
    description: string,
    date: string,
    images: string[],
    comments: Comment[],
    isFavorite: boolean,
}