//Interface para registrar um usuário recebido pela fila
export interface INewUser {
    id: number,
    name: string,
    email: string,
    role: string
}