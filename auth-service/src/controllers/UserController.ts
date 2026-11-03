//packages
import { Request, Response } from "express";

//helpers
import { createHashedPassword, checkPassword } from "../helpers/bcrypt-helper.js";
import { generateToken } from "../helpers/jwt-helper.js";

//repositories
import { createUser, getUserByEmail, getUserById, getAllUsers, updateUserRole } from "../repositories/UserRepository.js";

//interfaces
import { IAuthRequest, IRegisterBody } from "../dtos/auth.dto.js";
import { ICreatedUserData } from "../dtos/auth.dto.js";
import { ILoginBody } from "../dtos/auth.dto.js";

export const register = async (req: Request<{}, {}, IRegisterBody>, res: Response): Promise<void> => {
    const { name, email, role, password } = req.body

    //function to hash the password
    const hashedPassword = createHashedPassword(password)

    //Set the user
    const user: ICreatedUserData = {
        name, email, role, hashedPassword
    }

    //create the user in db
    const createdUser = await createUser(user)

    //create jwt token
    const token = generateToken(createdUser.id, createdUser.role)

    //register token in the cookie
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    })

    res.status(201).json({
        msg: "Usuário criado com sucesso.",
        user: {
            id: createdUser.id,
            email: createdUser.email,
            role: createdUser.role
        }
    })
}

export const login = async (req: Request<{}, {}, ILoginBody>, res: Response) => {

    const { email, password } = req.body

    const user = await getUserByEmail(email)

    if (!user) {
        throw new Error("Usuário não cadastrado.")
    }

    //compare if the password matches
    const isValidPassword = checkPassword(password, user!.hashedPassword)

    if (!isValidPassword) {
        res.status(401).json({ msg: "E-mail ou senha incorretos, tente novamente." })
    }

    //create jwt token
    const token = generateToken(user.id, user.role)

    //register token in the cookie
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    })

    res.status(200).json({
        msg: "Login realizado com sucesso.",
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    })
}

export const currentuser = async (req: IAuthRequest, res: Response) => {
    const user = await getUserById(req.user!.id)

    if (!user) {
        res.status(404).json({ error: "Usuário não encontrado." })
        return
    }

    res.status(200).json({ user })

}

export const allUsers = async (req: Request, res: Response) => {
    try {

        const users = await getAllUsers()

        res.status(200).json({ users })

    } catch (error: any) {
        throw new Error('Não foi possível carregar todos os usuários', error)
    }
}

export const changeRole = async (req: IAuthRequest, res: Response) => {

    console.log(req.user)

    const { id, role } = req.body

    try {
        await updateUserRole({ id, role })

        res.status(201).json({ msg: "Usuário atualizado com sucesso" })
    } catch (error: any) {
        throw new Error(error)
    }

}