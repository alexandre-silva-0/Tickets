import { Request } from "express";

//Interface para registrar um usuário recebido pela fila
export interface INewUser {
    id: number,
    name: string,
    email: string,
    role: string
}

//Interface para verificar se um usuário está logado
export interface IAuthRequest extends Request {
    user?: {
        id: number;
        role: string
    }
}