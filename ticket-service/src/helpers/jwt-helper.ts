import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest } from "../dtos/users.dto.js";

export const checkToken = (req: IAuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token
    console.log(token)
    if (!token) {
        res.status(401).json({ msg: 'Você não está autenticado. Faça login e tente novamente.' })
    }

    try {
        const secret = process.env.JWT_SECRET as string
        const decoded = jwt.verify(token, secret) as { id: number; role: string }

        req.user = decoded

        next()
    } catch (error) {
        res.status(401).json({ error: 'Token inválido ou expirado.' })
    }
}