import { User } from "../models/User.js";

//interfaces
import type { INewUser } from "../dtos/users.dto.js";

export const registerNewUser = async (data: INewUser) => {
    try {
        await User.upsert({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
        })

        console.log("Novo usuário recebido do Auth Service", data)
    } catch (error) {
        console.error("Não foi possível registrar usuário, ", error)
    }
}