import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest } from "../dtos/auth.dto.js";

export const generateToken = (userId: number, role: string): string => {
    const secret = process.env.JWT_SECRET

    if (!secret) {
        throw new Error("A variável de ambiente JWT_SECRET não está definida")
    }

    return jwt.sign({ id: userId, role }, secret, {
        expiresIn: '1d'
    })
}

export const checkToken = (req: IAuthRequest, res: Response, next: NextFunction) => {

    const token = req.cookies.token

    if (!token) {
        res.status(401).json({ error: "Você não está autenticado. Faça login para continuar." })
    }

    try {
        const secret = process.env.JWT_SECRET as string

        const decoded = jwt.verify(token, secret) as { id: number; role: string }

        req.user = decoded

        next()
    } catch (error) {
        res.status(401).json({ error: "Token inválido ou expirado." })
    }
}