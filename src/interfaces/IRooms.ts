import { Socket } from "socket.io-client";

export interface RoomsCard {
    username:string;
    image:string;
    rol: string;
    room:string;
    url_media:string;
}

export interface Message {
    message?: string;
    room: string;
    author: string;
    photo: string;
    time: string;
    rol: string;
}

export interface ChatProps {
    socket: Socket;
    username: string;
    room: string;
    photo: string;
    rol: string;
    leaveRoom: () => void;
}