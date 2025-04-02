import { IMedia, IReview } from "./IMedia";

interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    image: string
    account: string
    role: string
    favorites: IMedia[]
    reviews: IReview[]
    views: IMedia[]
    list: IMedia[]
}

export interface IUserSession {
    user: IUser;
    token: string;
    login: true;
}