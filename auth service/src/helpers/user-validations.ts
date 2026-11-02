import { Request, Response, NextFunction } from "express";
import { IAuthRequest } from "../dtos/auth.dto.js";
import { body, ValidationChain } from "express-validator";
import { getUserById } from "../repositories/UserRepository.js";


export const checkAuthorization = (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new Error("Não foi possível identificar o usuário logado")
    }

    if (req.user.role !== 'admin') {
        return res.status(404).json({ msg: "Usuário não tem permissão para completar esta ação." })
    }

    next()
}

export const changeRoleValidation: ValidationChain[] = [
    body('id')
        .notEmpty().withMessage("O id do usuário é obrigatório.")
        .custom(async (value) => {
            const user = await getUserById(value)
            if (!user) {
                throw new Error("Usuário não cadastrado.")
            }

            return true
        }),
    body("role")
        .notEmpty().withMessage("O tipo de usuário é obrigatório.")
        .isIn(['agent', 'customer', 'admin']).withMessage('Tipo de usuário inválido, selecione um dos valores acima.')
]