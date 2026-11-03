import { Request } from "express";

//Interface to register route
export interface IRegisterBody {
    name: string;
    email: string;
    password: string;
    role: 'agent' | 'customer' | 'admin'
}

//Interface to create a user
export interface ICreatedUserData {
    name: string;
    email: string;
    hashedPassword: string;
    role: 'agent' | 'customer' | 'admin'
}

//Interface to login route
export interface ILoginBody {
    email: string;
    password: string;
}

//Interface to check if the token is valid
export interface IAuthRequest extends Request {
    user?: {
        id: number;
        role: string
    }
}

//interface to check users info
export interface IUpdateUserRole {
    id: number,
    role: string,
}