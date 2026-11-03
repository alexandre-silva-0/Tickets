import { User } from "../models/User.js";

//interfaces
import { ICreatedUserData, IUpdateUserRole } from "../dtos/auth.dto.js";

export async function getUserById(id: number) {
    return await User.findOne({ where: { id }, raw: true })
}

export async function getUserByEmail(email: string) {
    return await User.findOne({ where: { email } })

}

export async function createUser(data: ICreatedUserData) {
    const user = await User.create({
        name: data.name,
        email: data.email,
        hashedPassword: data.hashedPassword,
        role: data.role
    });

    return user
}

export async function getAllUsers() {
    return await User.findAll({ raw: true })
}

export async function updateUserRole(data: IUpdateUserRole) {
    return await User.update({ role: data.role }, { where: { id: data.id } })
}