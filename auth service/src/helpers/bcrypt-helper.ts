import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";

export const createHashedPassword = (rawPassword: string) => {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(rawPassword, salt)

    return hashedPassword
}

export const checkPassword = (uncheckedPassword: string, password: string) => {
    return compareSync(uncheckedPassword, password)
}